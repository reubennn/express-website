const express = require("express");

// Middleware to ensure we get validated data from the client in the feedback form
const { check, validationResult } = require("express-validator");

const router = express.Router(); // Use router to access the express app router

module.exports = params => {
    const { feedbackService } = params;

    router.get("/", async (req, res, next) => {
        // Good to use try-catch if we are using an await statement in a route
        // to handle possible error due to asynchronous app
        try {
            const feedback = await feedbackService.getList();

            const errors = req.session.feedback ? req.session.feedback.errors : false;

            const successMessage = req.session.feedback ? req.session.feedback.message : false;

            req.session.feedback = {}; // After errors have been stored, reset the state

            return res.render("layout", {
                pageTitle: "Feedback",
                template: "feedback",
                feedback,
                errors,
                successMessage,
            });
        } catch (err) {
            return next(err);
        }
    });

    router.post("/", [
        // Validation checks with express-validator
        check("name")       // Check the name
            .trim()             // Remove empty characters at beginning and end
            .isLength({ min: 3 }) // Assume a name should be at least 3 characters long
            .escape()           // Make sure there is no Javascript or HTML embedded in the entry
            .withMessage("A name is required."),  // Message returned if something is wrong
        check("email")       // Check the Email
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email address is required."),
        check("title")       // Check the title
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage("A title is required."),
        check("message")       // Check the title
            .trim()
            .isLength({ min: 5 })
            .escape()
            .withMessage("A message is required."),
    ],
        async (req, res) => {
            const errors = validationResult(req);

            // If an error occurs (the errors array is not empty)
            if (!errors.isEmpty()) {
                req.session.feedback = {
                    errors: errors.array(), // Give us the errors as an array from express-validator
                };
                return res.redirect("/feedback");
            }

            const { name, email, title, message } = req.body;
            await feedbackService.addEntry(name, email, title, message);

            req.session.feedback = {
                message: "Thank you for your feedback."
            };
            return res.redirect("/feedback");
        });

    return router;
};
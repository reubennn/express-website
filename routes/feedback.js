const express = require("express");

const router = express.Router(); // Use router to access the express app router

module.exports = params => {
    const { feedbackService } = params;

    router.get("/", async (req, res, next) => {
        // Good to use try-catch if we are using an await statement in a route
        // to handle possible error due to asynchronous app
        try {
            const feedback = await feedbackService.getList();
            return res.json(feedback);
        } catch (err) {
            return next(err);
        }
    });

    router.post("/", (req, res) => {
        return res.send("Feedback form posted");
    });

    return router;
};
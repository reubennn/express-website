const express = require("express");

const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router(); // Use router to access the express app router

module.exports = () => {
    router.get("/", (req, res) => {
        res.render("pages/index", { pageTitle: "Welcome" });
    });

    router.use("/speakers", speakersRoute());
    router.use("/feedback", feedbackRoute());

    return router;
};


// module.exports = router; // Return the router object
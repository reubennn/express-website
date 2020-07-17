const express = require("express");

const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router(); // Use router to access the express app router

module.exports = params => {
    router.get("/", async (req, res) => {
        res.render("pages/index", { pageTitle: "Welcome" });
    });

    router.use("/speakers", speakersRoute(params));
    router.use("/feedback", feedbackRoute(params));

    return router;
};
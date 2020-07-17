const express = require("express");

const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router(); // Use router to access the express app router

module.exports = params => {
    router.get("/", async (req, res) => {

        // Check the visit count
        // if (!req.session.visitcount) {
        //     req.session.visitcount = 0;
        // }
        // req.session.visitcount += 1;
        // console.log(`Number of visit: ${req.session.visitcount}`);

        res.render("pages/index", { pageTitle: "Welcome" });
    });

    router.use("/speakers", speakersRoute(params));
    router.use("/feedback", feedbackRoute(params));

    return router;
};
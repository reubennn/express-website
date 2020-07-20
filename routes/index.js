const express = require("express");

const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router(); // Use router to access the express app router

module.exports = params => {
    const { speakersService } = params;
    router.get("/", async (req, res) => {
        const topSpeakers = await speakersService.getList();
        // console.log(topSpeakers);
        res.render("layout", { pageTitle: "Welcome", template: "index", topSpeakers });

        // Check the visit count
        // if (!req.session.visitcount) {
        //     req.session.visitcount = 0;
        // }
        // req.session.visitcount += 1;
        // console.log(`Number of visit: ${req.session.visitcount}`);
    });

    router.use("/speakers", speakersRoute(params));
    router.use("/feedback", feedbackRoute(params));

    return router;
};
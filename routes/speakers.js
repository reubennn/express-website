const express = require("express");

const router = express.Router(); // Use router to access the express app router

module.exports = params => {
    const { speakersService } = params;

    router.get("/", async (req, res) => {
        const speakers = await speakersService.getList(); // Get list of all speakers
        return res.json(speakers);
    });

    router.get("/:shortname", (req, res) => {
        return res.send(`Detail of page of ${req.params.shortname}`);
    });

    return router;
};
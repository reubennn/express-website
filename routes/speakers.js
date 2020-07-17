const express = require("express");

const router = express.Router(); // Use router to access the express app router

module.exports = () => {
    router.get("/", (req, res) => {
        return res.send("Speakers list");
    });

    router.get("/:shortname", (req, res) => {
        return res.send(`Detail of page of ${req.params.shortname}`);
    });

    return router;
};
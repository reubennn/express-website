const express = require("express");

const router = express.Router(); // Use router to access the express app router

module.exports = () => {
    router.get("/", (req, res) => {
        return res.send("Feedback page");
    });

    router.post("/", (req, res) => {
        return res.send("Feedback form posted");
    });

    return router;
};
const express = require("express");

const router = express.Router(); // Use router to access the express app router

module.exports = params => {
    const { feedbackService } = params;

    router.get("/", async (req, res) => {
        const feedback = await feedbackService.getList();
        return res.json(feedback);
    });

    router.post("/", (req, res) => {
        return res.send("Feedback form posted");
    });

    return router;
};
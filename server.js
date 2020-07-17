const express = require("express");
const path = require("path");

// Import the FeedbackService and SpeakersService classes from the javascript files
const FeedbackService = require("./services/FeedbackService");
const SpeakersService = require("./services/SpeakerService");

// Create new feedbackService and speakerService objects
const feedbackService = new FeedbackService("./data/feedback.json");
const speakersService = new SpeakersService("./data/speakers.json");

const routes = require("./routes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middleware
app.use(express.static(path.join(__dirname, "./static")));

app.use(
    "/",
    routes({
        feedbackService,
        speakersService,
    })); // Add the routes module we created and use it as middleware


app.listen(PORT, () => {
    console.log(`Express server listening on PORT ${PORT}!`);
});
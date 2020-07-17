const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");

// Import the FeedbackService and SpeakersService classes from the javascript files
const FeedbackService = require("./services/FeedbackService");
const SpeakersService = require("./services/SpeakerService");

// Create new feedbackService and speakerService objects
const feedbackService = new FeedbackService("./data/feedback.json");
const speakersService = new SpeakersService("./data/speakers.json");

const routes = require("./routes");

const app = express();
const PORT = 3000;

app.set("trust proxy", 1); // Trust cookies that are passed through a reverse proxy

// Set up the cookie session middleware
app.use(
    cookieSession({
        name: "session",
        keys: ["lUAUIhtge51337", "yeet827u5u1hs"],
    })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middleware
app.use(express.static(path.join(__dirname, "./static")));

// Add the routes module we created and use it as middleware
app.use( 
    "/",
    routes({
        feedbackService,
        speakersService,
    })
);


app.listen(PORT, () => {
    console.log(`Express server listening on PORT ${PORT}!`);
});
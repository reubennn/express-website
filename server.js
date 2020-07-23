const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const createError = require("http-errors");
const bodyParser = require("body-parser");

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

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = "ROUX Meetups";

// Middleware
app.use(express.static(path.join(__dirname, "./static")));

/*
Demonstration to never throw, since it crashed the entire website app
Instead, we used return next, with the error,
so that it shows the error but does not crash the app.
*/
// app.get("/throw", (req, res, next) => {
//     setTimeout(() => {
//         return next(new Error("Something did throw!"));
//     }, 500);
// });

app.use(async (req, res, next) => {
    try {
        const names = await speakersService.getNames();
        res.locals.speakerNames = names;
        // console.log(res.locals);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Add the routes module we created and use it as middleware
app.use(
    "/",
    routes({
        feedbackService,
        speakersService,
    })
);

// Middleware to handle any URL not specified in the app
app.use((req, res, next) => {
    return next(createError(404, "Page not found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    console.error(err);
    const status = err.status || 500; // If we don't get any error status, default to 500 (Internal server error)
    res.locals.status = status;
    res.status(status); // Set status on HTTP response
    res.render("error");
});

app.listen(PORT, () => {
    console.log(`Express server listening on PORT ${PORT}`);
});
const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middleware
app.use(express.static(path.join(__dirname, "./static")));

app.get("/", (req, res) => {
    res.render("pages/index", {pageTitle: "Welcome"});
});

app.get("/speakers", (req, res) => {
    res.sendFile(path.join(__dirname, "./static/speakers.html"));
});

app.listen(PORT, () => {
    console.log(`Express server listening on PORT ${PORT}!`);
});
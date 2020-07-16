const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "./static")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./static/index.html"));
});

app.get("/speakers", (req, res) => {
    res.sendFile(path.join(__dirname, "./static/speakers.html"));
});

app.listen(PORT, () => {
    console.log(`Express server listening on PORT ${PORT}!`);
});
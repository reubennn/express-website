const express = require("express");
const path = require("path");

const routes = require("./routes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middleware
app.use(express.static(path.join(__dirname, "./static")));

app.use("/", routes()); // Add the routes module we created and use it as middleware


app.listen(PORT, () => {
    console.log(`Express server listening on PORT ${PORT}!`);
});
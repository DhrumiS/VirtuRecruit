require("dotenv").config();
const express = require("express");
const session = require('express-session');
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.route");
const hrRoutes = require("./routes/hr.route");
require('./db/index')

const app = express();

app.use(session({
    secret: 'dhrumi',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

app.use("/user", userRoutes);
app.use("/hr", hrRoutes);

app.get("/", (req, res) => {
    res.render("home.hbs", {
        layout: false,
    });
});

app.use("*", (req, res) => {
    res.send("404 page not found");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on", port);
});

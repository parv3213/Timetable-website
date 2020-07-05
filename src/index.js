// Import Packages
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
require("./db/mongoose");

// Import Routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const rootRoute = require("./routes/root");
const profileRoute = require("./routes/profile");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signupRoute);
app.use(loginRoute);
app.use(rootRoute);
app.use(profileRoute);

// App connection
app.listen(port, () => {
	console.log("Server is up on port " + port);
});

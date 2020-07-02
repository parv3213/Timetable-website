// Import Packages
const express = require("express");
require("./db/mongoose");

// Import Models
const User = require("./models/user");

// Import Routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(signupRoute);
app.use(loginRoute);

// App connection
app.listen(port, () => {
	console.log("Server is up on port " + port);
});

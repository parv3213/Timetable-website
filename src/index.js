// Importing all the packages
const express = require("express");
require("./db/mongoose");
const User = require("./models/user");

//
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Test model
const testModel = new User({
	name: "Parv",
});
testModel.save((e) => {
	if (!e) {
		console.log("User saved!");
	}
});

// App connection
app.listen(port, () => {
	console.log("Server is up on port " + port);
});

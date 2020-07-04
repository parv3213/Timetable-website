// const config = require("../config/custom-environment-variables.json");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = new express.Router();
const jwtKey = "secret";

router.get("/login", (req, res) => {
	res.send("Please login"); // TODO UI to be added
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthTokens();
		res.send({ message: "Login Successfull! Token Generated", user, token });

		// Check, compare, understand and delete the comments
		// const user = await User.findOne({ email: req.body.email });
		// if (!user) {
		// 	throw new Error("User does not exists");
		// }
		// bcrypt.compare(req.body.password, user.password, (err, result) => {
		// 	if (err) {
		// 		throw new Error("Unable to login");
		// 	}
		// 	if (result) {
		// 		const token = jwt.sign(
		// 			{
		// 				email: user.email,
		// 			},
		// 			jwtKey,
		// 			{
		// 				expiresIn: "5h",
		// 			}
		// 		);
		// 		res.status(200).json({
		// 			message: "Login successful!",
		// 			token: token,
		// 		});
		// 	} else {
		// 		res.send("Unable to login");
		// 	}
		// });
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;

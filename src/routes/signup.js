const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/signup", (req, res) => {
	res.render("pages/signup"); //TODO We will add the ui page here
});

router.post("/signup", async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) throw new Error("Email Id already exists");
		user = new User(req.body);
		const token = await user.generateAuthToken();
		res.status(201).send({ message: "Signin successful", user, token });
	} catch (e) {
		res.status(400).send({ e: e.message });
	}
});

module.exports = router;

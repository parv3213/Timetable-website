const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/signup", (req, res) => {
	res.render("pages/signup");
});

router.post("/signup", async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) throw new Error("Email Id already exists");
		user = new User({
			name: req.body.name,
			rno: req.body.rno,
			email: req.body.email,
			password: req.body.password,
			year: req.body.year,
		});

		const token = await user.generateAuthToken();
		res.status(201).send({ message: "Signin successful", user, token });
	} catch (e) {
		res.status(400).send({ e: e.message });
	}
});

module.exports = router;

const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/login", (req, res) => {
	res.render("pages/login.ejs");
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		// res.send({ message: "Login Successfull! Token Generated", user, token });
		res.redirect('/user');
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;

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
		res.send({ token });
		// res.redirect("/users");
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;

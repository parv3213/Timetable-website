const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");
const router = new express.Router();

router.get("/user/profile", (req, res) => {
	res.render("pages/profile.ejs");
});

router.post("/user/profile", auth, async (req, res) => {
	try {
		const userChange = {
			name: req.body.name,
			year: Number(req.body.year),
			password: req.body.password,
		};
		const user = req.user;
		Object.keys(userChange).forEach((key) => {
			if (userChange[key] !== undefined) {
				user[key] = userChange[key];
			}
		});
		await user.save();
		res.send({ user: user });
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;

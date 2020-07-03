const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/login", (req, res) => {
	res.send("Please login"); // TODO UI to be added
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			throw new Error("Unable to login");
		}
		res.send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;

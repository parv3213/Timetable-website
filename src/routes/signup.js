const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/signup", (req, res) => {
	res.send("HI"); //FIXME We will add the ui page here
});

router.post("/signup", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		rno: req.body.rno,
	});

	try {
		await user.save();
		res.send(user);
	} catch (e) {
		res.status(500).send(e.message); // TODO correct status code
	}
});

module.exports = router;

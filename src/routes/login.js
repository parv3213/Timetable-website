const express = require("express");
const bcrypt = require("bcrypt");
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
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if(err) {
				throw new Error("Unable to login");
			}
			if(result) {
				res.send("Login successful!");
			}else {
				res.send("Unable to login");
			}
		});
	
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;

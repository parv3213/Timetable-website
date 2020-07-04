require("dotenv").config({ path: "./src/config/.env" });
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = new express.Router();

router.get("/signup", (req, res) => {
	res.send("HI"); //FIXME We will add the ui page here
});

router.post("/signup", (req, res) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		if (!data) {
			bcrypt.hash(req.body.password, 10, async (err, hash) => {
				if (err) {
					return res.status(500).json({ error: err });
				} else {
					const user = new User({
						name: req.body.name,
						email: req.body.email,
						rno: req.body.rno,
						password: hash,
					});

					try {
						await user.save();
						res.status(201).send(user);
					} catch (e) {
						res.status(500).send(e.message); // TODO correct status code
					}
				}
			});
		} else {
			res.send("Email already in use");
		}
	});
});

module.exports = router;

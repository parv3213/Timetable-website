require("dotenv").config({ path: "./src/config/.env" });
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = new express.Router();

router.get("/signup", (req, res) => {
	res.send("HI"); //TODO We will add the ui page here
});
//FIXME generate auth token on signup
router.post("/signup", async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) throw new Error("Email Id already exists");
		user = new User(req.body);
		await user.save();
		res.send(user);
	} catch (e) {
		res.status(500).send({ e: e.message }); //FIXME correct the status code
	}
	// FIXME understand the above code and then delete this and below comments
	// User.findOne({ email: req.body.email }, (err, data) => {
	// 	if (!data) {
	// 		bcrypt.hash(req.body.password, 10, async (err, hash) => {
	// 			if (err) {
	// 				return res.status(500).json({ error: err });
	// 			} else {
	// 				const user = new User({
	// 					name: req.body.name,
	// 					email: req.body.email,
	// 					rno: req.body.rno,
	// 					password: hash,
	// 				});

	// 				try {
	// 					await user.save();
	// 					res.status(201).send(user);
	// 				} catch (e) {
	// 					res.status(500).send(e.message);
	// 				}
	// 			}
	// 		});
	// 	} else {
	// 		res.send("Email already in use");
	// 	}
	// });
});

module.exports = router;

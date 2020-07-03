const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/signup", (req, res) => {
	res.send("HI"); //FIXME We will add the ui page here
});

router.post("/signup", async (req, res) => {
	if(req.body.password == req.body.confpass) {
		User.findOne({ email: req.body.email }, async (err, data) => {
			if(!data) {
				const user = new User({
					name: req.body.name,
					email: req.body.email,
					rno: req.body.rno,
					password: req.body.password,
					confpass: req.body.confpass
				});
		
				try {
					await user.save();
					res.send(user);
				} catch (e) {
					res.status(500).send(e.message); // TODO correct status code
				}
			}else {
				res.send("Email already in use");
			}
		});
		
	}else {
		res.send("Passwords don't match");
	}
	
});

module.exports = router;

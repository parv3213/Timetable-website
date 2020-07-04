const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/", (req, res) => {
	if (req.query.year) {
		return res.send(req.query.year);
	}
	res.send("Welcome to / route");
});

// router.post("/", (req, res) => {
// 	res.redirect(`/?year=${req.body.year}`);
// });

router.post("/", auth, (req, res) => {
	res.send({ message: "JWT Success!", user: req.user, token: req.token });
});

module.exports = router;

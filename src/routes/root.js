const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
	if (req.query.year) {
		return res.send(req.query.year);
	}
	res.send("Welcome to / route");
});

router.post("/", (req, res) => {
	res.redirect(`/?year=${req.body.year}`);
});

module.exports = router;

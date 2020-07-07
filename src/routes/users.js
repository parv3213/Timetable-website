const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/users", auth, (req, res) => {
	res.send({ message: "Welcome to the /user page" });
});

module.exports = router;

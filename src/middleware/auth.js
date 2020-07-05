require("dotenv").config({ path: "./src/config/.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtKey = process.env.JWT_KEY;

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, jwtKey);
		const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
		if (!user) throw new Error("User does not exists");
		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		res.status(400).send({ e: "No or Invalid token" });
	}
};

module.exports = auth;

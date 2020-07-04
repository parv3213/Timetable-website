require("dotenv").config({ path: "./src/config/.env" });
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	rno: { type: Number, required: true },
	password: { type: String, required: true },
	coreMember: { type: Boolean, default: false },
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
});

// Check if user exists and password
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error("User does not exists");
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error("Password is incorrect");
	return user;
};

// Generate Auth tokens
userSchema.methods.generateAuthTokens = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	//TODO set password using jwt
	name: { type: String, required: true },
	email: { type: String, required: true },
	rno: { type: Number, required: true },
	coreMember: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

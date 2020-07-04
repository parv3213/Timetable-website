const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// FIXME Removed Joi and added validator (remove comment after you see it)

const userSchema = new mongoose.Schema({
	//TODO set password using jwt
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
});

// Hash password before saving
userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;

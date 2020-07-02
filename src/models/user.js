const Joi = require('joi');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	//TODO set password using jwt
	name: { type: String, required: true },
	email: { type: String, required: true },
	rno: { type: Number, required: true },
	coreMember: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

function validate(user) {
    const schema = {
		name: Joi.string().required(),
        email: Joi.string().required().email(),
        rno: Joi.number().min(14).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;

const express = require("express");
const Joi = require("joi");
const User = require("../models/user");
const router = new express.Router();

router.get("/login", (req, res) => {
    res.send("Please login"); // UI to be added
});

router.post("/login", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {   //400 - bad request
        return res.status(400).send(error.details[0].message);
    }
    User.findOne({email: req.body.email}, (err, data) => {
        if(data) {
            if(data.rno == req.body.rno) {
                res.send("Login successful!");
            }else {
                res.send("Login failed");
            }
        }
    });
    
});

function validate(user) {
    const schema = {
        email: Joi.string().required().email(),
        rno: Joi.number().min(14).required()
    };
    return Joi.validate(user, schema);
}

module.export = router;
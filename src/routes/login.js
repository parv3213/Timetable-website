const express = require("express");
const { User, validate } = require("../models/user");
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

module.export = router;
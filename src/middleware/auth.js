const jwt = require("jsonwebtoken");
const jwtKey = "secret"

function auth(req, res, next) {
    const token = req.body.token || req.headers.authorization;
    if(!token) return res.status(401).send("Access denied as no token is provided");
    try {
        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded;
        next();
    }
    catch(err) {
        res.status(400).send("Invalid token");
    }
    
}


module.exports = auth;
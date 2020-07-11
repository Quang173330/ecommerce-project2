const jwt = require("jsonwebtoken");
const fs = require("fs");
const jwtSecretKey = fs.readFileSync(__dirname + "/private.key").toString();

module.exports = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        jwt.verify(token, jwtSecretKey, (err, userData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                req.userId = userData.UserId;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
};
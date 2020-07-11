const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const jwtAuthentication = require("../jwtAuthentication");

const secretKey = fs.readFileSync(__dirname + "/../private.key").toString();
const validators = require("../validators");
const users = require("../controllers/users.controller");

router.post("/register/", (req, res) => {
    const { username, email, password } = req.body;
    
    if(username, email, password) {
        if(validators.validateUsername(username)
        && validators.validateEmail(email)
        && validators.validatePassword(password)) {
            users.checkUsernameAndEmail(username, email).then(docs => {
                if(docs) {
                    if(docs.Email === email) {
                        res.json({status: false, message: "The email already exists"});
                    } else if(docs.Username === username) {
                        res.json({status: false, message: "The username already exists"});
                    }
                } else {
                    users.addUser(username, email, password);
                    
                    res.json({status: true, message: "The user has been registered successfully"});
                }
            });
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

router.post("/login/", (req, res) => {
    const { username, password } = req.body;

    if(username && password) {
        users.findUserByUsername(username).then(userData => {
            if(userData) {
                bcrypt.compare(password, userData.Password, (err, status) => {
                    if(status) {
                        jwt.sign({UserId: userData._id}, secretKey, {expiresIn: "365d"},
                        (err, token) => {
                            res.json({
                                status: true,
                                token
                            });
                        })
                    } else {
                        res.json({status: false, message: "The username or password are incorrect"});
                    }
                });
            } else {
                res.json({status: false, message: "The username no exists"});
            }
        });
    } else {
        res.sendStatus(403);
    }
});

router.get("/checkUserToken/", (req, res) => {
    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        jwt.verify(token, secretKey, (err, userData) => {
            if(err) {
                res.json({status: false});
            } else {
                users.getUserById(userData.UserId).then(user => {
                    res.json({
                        status: true, 
                        userData: {
                            Permits: user.Permits,
                            Name:user.Username
                        }
                    });
                });
            }
        });
    } else {
        res.json({status: false});
    }
});

router.get("/getUserData/", jwtAuthentication, (req, res) => {
    users.getUserById(req.userId).then(user => {
        res.json({
            status: true,
            userData: {
                Username: user.Username,
                Email: user.Email,
                Permits: user.Permits
            }
        });
    });
});
router.get("/getAllUser/",jwtAuthentication,(req,res)=>{
    users.getAllUsers().then(data =>res.json(data));
});
router.post("/changeUsername/", jwtAuthentication, (req, res) => {
    const username = req.body.username;

    if(username) {
        if(validators.validateUsername(username)) {
            users.checkUsername(username).then(userData => {
                if(userData) {
                    res.json({
                        status: false,
                        message: "The username already exists"
                    });
                } else {
                    users.changeUsername(req.userId, username).then(userUpdated => {
                        if(userUpdated) {
                            res.json({
                                status: true
                            });
                        } else {
                            res.json({
                                status: false,
                                message: "An error has occurred on the server. Try again later"
                            });
                        }
                    });
                }
            });
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

router.post("/changeEmail/", jwtAuthentication, (req, res) => {
    const email = req.body.email;

    if(email) {
        if(validators.validateEmail(email)) {
            users.checkEmail(email).then(userData => {
                if(userData) {
                    res.json({
                        status: false,
                        message: "The email already exists"
                    });
                } else {
                    users.changeEmail(req.userId, email).then(userUpdated => {
                        if(userUpdated) {
                            res.json({status: true});
                        } else {
                            res.json({
                                status: false,
                                message: "An error has occurred on the server. Try again later"
                            });
                        }
                    });
                }
            });
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

router.post("/changePassword/", jwtAuthentication, (req, res) => {
    const { newPassword, currentPassword } = req.body;

    if(newPassword && currentPassword) {
        if(validators.validatePassword(newPassword)) {
            users.getUserById(req.userId).then(userData => {
                bcrypt.compare(currentPassword, userData.Password, (err, state) => {
                    if(state) {
                        users.changePassword(req.userId, newPassword).then(userUpdated => {
                            if(userUpdated) {
                                res.json({status: true});
                            } else {
                                res.json({
                                    status: false,
                                    message: "An error has occurred on the server. Try again later"
                                });
                            }
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "The current password is incorrect"
                        });
                    }
                });
            });
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
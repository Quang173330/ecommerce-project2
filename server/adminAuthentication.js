const users = require("./controllers/users.controller");

module.exports = (req, res, next) => {
    if(req.userId) {
        users.getUserById(req.userId).then(userData => {
            if(userData) {
                if(userData.Permits === "admin") {
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
        });
    }
};
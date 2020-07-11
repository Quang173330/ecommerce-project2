const Users = require("../models/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function checkUsernameAndEmail(username, email) {
    return Users.findOne({$or: [{Username: username}, {Email: email}]});
}

function checkUsername(username) {
    return Users.findOne({Username: username});
}

function checkEmail(email) {
    return Users.findOne({Email: email});
}

function addUser(username, email, password) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(!err) {
            const newUser = new Users({
                Username: username,
                Email: email,
                Password: hash,
                Permits: "user"
            });
        
            return newUser.save();
        }
    });
}

function findUserByUsername(username) {
    return Users.findOne({Username: username});
}
function getAllUsers(){
    const permits="user"
    return Users.find({Permits:permits});
}
function getUserById(id) {
    return Users.findOne({_id: id});
}

function changeUsername(id, username) {
    return Users.findOneAndUpdate({_id: id}, {Username: username});
}

function changeEmail(id, email) {
    return Users.findOneAndUpdate({_id: id}, {Email: email});
}

function changePassword(id, password) {
    return new Promise(resolve => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(!err) {
                Users.findOneAndUpdate({_id: id}, {Password: hash}).then(res => resolve(res));
            }
        });
    });
}

module.exports = {
    getAllUsers,
    addUser,
    checkUsernameAndEmail,
    checkUsername,
    checkEmail,
    findUserByUsername,
    getUserById,
    changeUsername,
    changeEmail,
    changePassword
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
    Username: {
        type: String,
        maxlength: 30,
        minlength: 4
    },
    Password: String,
    Email: String,
    Permits: String
});

module.exports = mongoose.model("users", users);
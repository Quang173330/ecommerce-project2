const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories = new Schema({
    Name: String,

});

module.exports = mongoose.model("categories", categories);
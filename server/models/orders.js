const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orders = new Schema({
    Name:String,
    Email:String,
    Phone:String,
    Address:String,
    UserId: String,
    Total: Number,
    Date: Date,
    State:String,
    Products: Array
});

module.exports = mongoose.model("orders", orders);
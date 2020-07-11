const products = require("./api/products");
const users = require("./api/users");
const checkout = require("./api/checkout");
const orders = require("./api/orders");
const categories = require("./api/categories");
module.exports = app => {
    app.use("/api/products/", products);
    app.use("/api/users/", users);
    app.use("/api/checkout/", checkout);
    app.use("/api/orders/", orders);
    app.use("/api/categories/", categories);
};
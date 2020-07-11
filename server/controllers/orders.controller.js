const Orders = require("../models/orders");

const Products = require("./products.controller");

function addOrder(name,email,phone,address,userId, total, productIds) {
    const order = new Orders({
        Name:name,
        Email:email,
        Phone:phone,
        Address:address,
        UserId: userId,
        Total: total,
        Date: Date.now(),
        State:"Orders are being processed",
        Products: productIds
    });

    return order.save();
}
function deleteById(id){
    return Orders.deleteOne({_id:id});
}

function getOrders(userId) {
    return new Promise(resolve => {
        Orders.find({UserId: userId}, (err, res) => {
            if(!err) {
                const products = [];
                
                res.forEach(order => {
                    products.push(
                        Products.getProductsByIds(order.Products).then(products => {
                            order.Products = products;
                            return order;
                        })
                    );
                });

                Promise.all(products).then(orders => resolve(orders));
            }
        });
    });
}
function getAllOrders() {
    return new Promise(resolve => {
        Orders.find({}, (err, res) => {
            if(!err) {
                const products = [];
                
                res.forEach(order => {
                    products.push(
                        Products.getProductsByIds(order.Products).then(products => {
                            order.Products = products;
                            return order;
                        })
                    );
                });

                Promise.all(products).then(orders => resolve(orders));
            }
        });
    });
}
function updateState(id,state){
    return Orders.findOneAndUpdate({_id: id}, {State: state});
}
module.exports = {
    deleteById,
    addOrder,
    getOrders,
    updateState,
    getAllOrders
};
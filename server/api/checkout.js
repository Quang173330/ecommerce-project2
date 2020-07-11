const express = require("express");
const router = express.Router();
const jwtAuthentication = require("../jwtAuthentication");
const products = require("../controllers/products.controller");
const orders = require("../controllers/orders.controller");
const paypal = require("../config/paypal.config");
const validators = require("../validators");

router.post("/cart/", jwtAuthentication, (req, res) => {
    const cart = req.body.cart;
    const name = req.body.name;
    const email= req.body.email;
    const phone=req.body.phone;
    const address= req.body.address;

    if(cart&&validators.validateName(name)&&validators.validateEmail(email)&&validators.validatePhone(phone)&&validators.validateAddress(address)) {
        const productIds = [];

        for(const i in cart) {
            productIds.push(i);
        }

        products.getProductsByIds(productIds).then(products => {
            var subtotal = 0;
            const items = [];

            products.forEach(product => {
                const quantity = cart[product._id].quantity;
                subtotal += product.Price * quantity;

                items.push({
                    name: product.Title,
                    price: product.Price,
                    currency: "USD",
                    quantity: quantity
                });
            });

            const shipping = subtotal > 50 ? 0 : 10;
            const total = shipping + subtotal;
            orders.addOrder(name,email,phone,address,req.userId, total, productIds);
            res.json({
                status: true,
                redirectURL: "http://127.0.0.1:3000/my-account/orders"
            });

        });
    } else {
        res.sendStatus(403);
    }
});

router.post("/complete/", jwtAuthentication, (req, res) => {
    const paymentId = req.body.paymentId;
    const payerId = req.body.PayerID;
    const cart = req.body.cart;

    if(paymentId && payerId && cart) {
        const productIds = [];

        for(const i in cart) {
            productIds.push(i);
        }

        paypal.payment.get(paymentId, (err, paymentDetails) => {
            if(!err, paymentDetails) {
                const total = paymentDetails.transactions[0].amount.total;

                const execute_payment_json = {
                    payer_id: payerId,
                    transactions: [{
                        amount: {
                            currency: "USD",
                            total: total
                        }
                    }]
                };

                paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
                    if (!err) {
                        if(payment.state === "approved") {
                            orders.getOrderByPayId(payment.id).then(order => {
                                if(!order) {
                                    orders.addOrder(payment.id, req.userId, total, productIds);
                                }
                                res.json({
                                    status: true,
                                    message: "The payment has been successfully"
                                });
                            });
                        } else {
                            res.sendStatus(403);
                        }
                    } else {
                        res.sendStatus(403);
                    }
                });
            } else {
                res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;
const express = require("express");
const router = express.Router();
const jwtAuthentication = require("../jwtAuthentication");
const adminAuthentication = require("../adminAuthentication");
const fs = require("fs");

const categories = require("../controllers/categories.controller");


router.get("/getCategories/", (req, res) => {
    categories.getCategories().then(data => res.json(data));
});

router.get("/getProductById/:productId", (req, res) => {
    const productId = req.params.productId;

    if(productId) {
        products.getProductById(productId).then(product => res.json(product));
    } else {
        res.sendStatus(403);
    }
});

router.get("/searchproducts/:search", (req, res) => {
    const search = req.params.search;

    products.searchProducts(search).then(data => res.json(data));
});

router.post("/getProductsByIds/", (req, res) => {
    const productIds = req.body.productIds;

    if(productIds) {
        products.getProductsByIds(productIds).then(data => res.json(data));
    } else {
        res.json([]);
    }
});

router.post("/addProduct/", jwtAuthentication, adminAuthentication, (req, res) => {
    const { title, description, price, quantity } = req.body;
    const image = req.files.image;
    
    if(image && title && description && price && quantity) {
        if(validators.validateImage(image.mimetype)) {
            const imageName = Date.now() + image.name;

            image.mv(`${__dirname}/../../public/img/products/${imageName}`, err => {
                if(!err) {
                    products.addProduct(title, description, price, imageName, quantity)
                    .then(product => {
                        if(product) {
                            res.json({
                                status: true,
                                productId: product.id
                            });
                        } else {
                            res.json({
                                status: false,
                                error: "Internal Server Error"
                            });
                        }
                    });
                } else {
                    res.json({
                        status: false,
                        error: "Internal Server Error"
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



router.post("/deleteProduct/", jwtAuthentication, adminAuthentication, (req, res) => {
    const id = req.body.id;

    if(id) {
        products.getProductById(id).then(product => {
            fs.unlinkSync(`${__dirname}/../../public/img/products/${product.Thumb}`);
            
            products.deleteProduct(id).then(status => {
                if(status.deletedCount) {
                    res.json({status: true});
                }
            });
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
const mongoose = require("mongoose");
const Products = require("../models/products");

function getProducts(limit = 9) {
    return Products.find({}).limit(limit);
}

function getProductById(id) {
    return Products.findById(id);
}
function getProductByCategory(category) {
    return Products.find({Category:category});
}
function searchProducts(search) {
        let str=search.toLocaleUpperCase()
        return Products.find({Title: {$regex: `.*${str}.*`}});

}

function getProductsByIds(ids) {
    return Products.find({_id: ids});
}

function addProduct(title, description, price, thumb, quantity,category) {
    const product = new Products({
        Title: title,
        Description: description,
        Price: price,
        Thumb: thumb,
        Quantity: quantity,
        Category:category
    });

    return product.save();
}

function updateProductExemptThumb(id, title, description, price, quantity,category) {
    return Products.findOneAndUpdate({_id: id}, {
        Title: title,
        Description: description,
        Price: price,
        Quantity: quantity,
        Category:category
    });
}

function updateThumb(id, thumb) {
    return Products.findByIdAndUpdate(id, {Thumb: thumb});
}

function deleteProduct(id) {
    return Products.deleteOne({_id: id});
}

module.exports = {
    getProducts,
    getProductById,
    searchProducts,
    getProductsByIds,
    addProduct,
    updateProductExemptThumb,
    updateThumb,
    deleteProduct,
    getProductByCategory
};
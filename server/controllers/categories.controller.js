const mongoose = require("mongoose");
const Categories = require("../models/categories");

function getCategories() {
    return Categories.find({});
}
function getCategoriesByName(name) {
    return Categories.find({Name: name});
}

function addCategory(name) {
    if(!Categories.find({Name:name})){
        const categories = new Categories({
            Name:name
        });
    };

    return categories.save();
}

function deleteCategory(name) {
    return Categories.deleteOne({Name: name});
}

module.exports = {
    getCategories,
    getCategoriesByName,
    addCategory,
    deleteCategory,
};
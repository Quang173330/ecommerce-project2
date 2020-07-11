export function getCart() {
    return JSON.parse(window.localStorage.getItem("cart") || "{}");
}

function save(shoppingCart) {
    window.localStorage.setItem("cart", JSON.stringify(shoppingCart));
}

export function addProduct(id, quantity) {
    const shoppingCart = getCart();
    shoppingCart[id] = {
        id,
        quantity
    };

    save(shoppingCart);
}

export function deleteProduct(id) {
    const shoppingCart = getCart();

    delete shoppingCart[id];

    save(shoppingCart);
}

export function deleteCart() {
    window.localStorage.cart = "";
}

export function loadProducts() {
    const cart = getCart();
    const productsId = [];

    for(var i in cart) {
        productsId.push(i);
    }

    return fetch("/api/products/getProductsByIds/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productIds: productsId
        })
    })
    .then(res => res.json())
    .then(res => {
        return res.map(product => {
            // we assign the quantity to the product
            return Object.assign(product, {
                // we use the the product id to find the quantity in the cart
                cartQuantity: cart[product._id].quantity
            });
        });
    });
}
import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import { loadProducts, deleteProduct } from "../services/shoppingCart.js";
import CartItem from "../components/CartItem/CartItem.jsx";
import CheckoutButton from "../components/CheckoutButton/CheckoutButton.jsx";
import Alert from "../components/Alert/Alert.jsx";
import Loader from "../components/Loader/Loader.jsx";

import "./styles/Cart.scss";

class Cart extends Component {
    constructor() {
        super();

        this.state = {
            items: [],
            isLoading: true
        };
        this.alerts = React.createRef();

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    UNSAFE_componentWillMount() {
        loadProducts()
        .then(res => this.setState({items: res, isLoading: false}));
        console.log(this.state.items);
    }

    deleteProduct(id) {
        deleteProduct(id);

        const items = this.state.items.filter(item => item._id !== id);
        
        this.setState({items: items});
    }

    getProducts() {
        if(this.state.items.length) {
            var subtotal = 0;

            const items = this.state.items.map((item, index) => {
                subtotal += item.Price * item.cartQuantity;
                return <CartItem details={item} deleteProduct={this.deleteProduct} key={index} />;
            });

            const delivery = subtotal > 50 ? 0 : 10;
            const total = subtotal + delivery;

            const deliveryText = delivery ? "$ 10" : "Free";

            return (
                <main className="cart-container">
                    <div className="cart-items-container">
                        <div className="items-header">
                            <div className="name">
                                Name
                            </div>
                            <div className="price">
                                Price
                            </div>
                            <div className="quantity">
                                Quantity
                            </div>
                        </div>

                        {items}
                    </div>

                    <div className="checkout-container">
                        <p className="title">Cart Total</p>

                        <div className="subtotal">
                            <p>Subtotal</p>
                            <p>$ {subtotal}</p>
                        </div>

                        <div className="delivery">
                            <p>Delivery</p>
                            <p>{deliveryText}</p>
                        </div>

                        <div className="total">
                            <p>Total</p>
                            <p>$ {total}</p>
                        </div>

                        <CheckoutButton alerts={this.alerts.current}/>
                    </div>
                </main>
            );
        } else {
            return (
                <div className="cart-text-container">
                    <h2>You no have items in your shopping cart</h2>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Alert ref={this.alerts}/>
                <Loader/>
                <Navbar/>
                {this.getProducts()}
            </div>
        );
    }
}

export default Cart;
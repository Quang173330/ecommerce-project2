import React, { Component } from "react";
import { getCart, deleteCart } from "../services/shoppingCart.js";
import Navbar from "../components/Navbar/Navbar.jsx";

import "./styles/Checkout.scss";
import Loader from "../components/Loader/Loader.jsx";

class Checkout extends Component {
    constructor() {
        super();

        this.state = {
            status: true,
            message: "",
            isLoading: false
        };
    }


    getMessage() {
        if(this.state.status) {
            return (
                <div className="checkout-info">
                    <p className="title">Ready!</p>
                    <p className="message">
                        The payment has been successfully.
                    </p>
                    <a href="/my-account/orders/">
                        <button className="see-orders">
                            See my orders
                        </button>
                    </a>
                </div>
            );
        } else {
            return (
                <div className="checkout-info">
                    <p className="title">Ready!</p>
                    <p className="message">
                        {this.state.message}
                    </p>
                    <a href="/cart/">
                        <button className="see-orders">
                            Return back cart
                        </button>
                    </a>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Loader active={this.state.isLoading}/>
                <div className="checkout-info-container">
                    {this.getMessage()}
                </div>
            </div>
        );
    }
}

export default Checkout;
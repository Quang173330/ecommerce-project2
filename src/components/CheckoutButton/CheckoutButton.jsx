import React, { Component } from "react";
import { getCart } from "../../services/shoppingCart.js";

import "./CheckoutButton.scss";

class CheckoutButton extends Component {
    checkout(){
        window.location='/pay/';
    }
    checkou() {
        fetch("/api/checkout/cart", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cart: getCart()
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                window.location = res.redirectURL;
            } else {
                this.props.alerts.addAlert("error", res.error);
            }
        });
    }

    render() {
        return (
            <button className="checkout-button" onClick={this.checkout.bind(this)}>
                Checkout
            </button>
        );
    }
}

export default CheckoutButton;
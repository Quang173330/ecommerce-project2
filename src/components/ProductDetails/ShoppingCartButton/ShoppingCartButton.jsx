import React, { Component } from "react";
import { addProduct } from "../../../services/shoppingCart.js";

import "./ShoppingCartButton.scss";

class ShoppingCartButton extends Component {
    constructor() {
        super();

        this.state = {
            stock: 1
        };

        this.handleStock = this.handleStock.bind(this);
    }

    handleStock(e) {
        const buttonId = e.target.id ? e.target.id : e.target.parentElement.id;

        if(buttonId === "minus") {
            if(this.state.stock > 1) {
                this.setState({stock: this.state.stock - 1});
            }
        } else {
            if(this.state.stock < this.props.stock) {
                this.setState({stock: this.state.stock + 1});
            }
        }
    }

    handleInput(e) {
        this.setState({stock: parseInt(e.target.value)});
    }

    handleForm(e) {
        e.preventDefault();
        console.log(this.props.productId);
        console.log(this.props.stock);
        addProduct(this.props.productId, this.state.stock);
        
    }

    render() {
        const quantity = this.props.stock ? this.props.stock : 1;
        const stockClass = quantity ? "" : "empty";
        const stockMessage = quantity ? `Products in stock: ${quantity}` : "Exhausted";

        return (
            <div className="shopping-cart-button">
                <form onSubmit={this.handleForm.bind(this)}>
                    <p className={stockClass}>{stockMessage}</p>

                    <div className="stock-select">
                        <button type="button" id="minus" onClick={this.handleStock}>
                            <i className="fas fa-minus"></i>
                        </button>

                        <input
                        type="number"
                        min="1"
                        max={quantity}
                        value={this.state.stock}
                        onChange={this.handleInput.bind(this)}
                        required/>

                        <button type="button" id="sum" onClick={this.handleStock}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>

                    <button className="add-cart-button">
                        Add cart
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default ShoppingCartButton;
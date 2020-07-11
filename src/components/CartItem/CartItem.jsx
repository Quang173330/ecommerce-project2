import React, { Component } from "react";

import "./CartItem.scss";

class CartItem extends Component {
    handleButton() {
        this.props.deleteProduct(this.props.details._id);
    }

    render() {
        const details = this.props.details;
        const title = details.Title.length > 30 ?
        details.Title.substr(0, 30) + "..." : details.Title;

        return (
            <article className="cart-item">
                <button className="delete-product" onClick={this.handleButton.bind(this)}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="image">
                    <a href={`/products/${details._id}`}>
                        <img src={`/img/products/${details.Thumb}`} alt={details.Title}/>
                    </a>
                </div>

                <div className="name">
                    {title}
                </div>

                <div className="price">
                    <small>$</small> {parseFloat(details.Price).toFixed(2)}
                </div>

                <div className="quantity">
                    {details.cartQuantity}
                </div>
            </article>
        );
    }
}

export default CartItem;
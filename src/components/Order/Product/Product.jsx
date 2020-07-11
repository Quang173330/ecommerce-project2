import React, { Component } from "react";

import "./Product.scss";

class Product extends Component {
    render() {
        const details = this.props.product;

        return (
            <div className="order-product">
                <a href={`/products/${details._id}`}>
                    <img src={`/img/products/${details.Thumb}`} alt={details.Title}/>
                </a>
                <p className="title">{details.Title}</p>
                <p className="price">$ {details.Price}</p>
            </div>
        );
    }
}

export default Product;
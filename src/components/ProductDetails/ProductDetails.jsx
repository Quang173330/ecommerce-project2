import React, { Component } from "react";
import ShoppingCartButton from "./ShoppingCartButton/ShoppingCartButton.jsx";

import "./ProductDetails.scss";

class ProductDetails extends Component {

    render() {
        const details = this.props.product;

        return (
            <div className="product-details-container">
                <div className="product-details">
                <div className="image">
                    <img src={`/img/products/${details.Thumb}`} alt={details.Title} />
                </div>
                <div className="details">
                    <div className="">
                        <h2 className="title">{details.Title}</h2>
                    
                        <p className="description">{details.Description}</p>
                    </div>
                    <div className="">
                        <h2 className="price">$ {parseFloat(details.Price).toFixed(2)}</h2>
                    </div>
                    <ShoppingCartButton stock={details.Quantity} productId={details._id}/>
                </div>
                </div>
            </div>
        );
    }
}

export default ProductDetails;
import React, { Component } from "react";
import { addProduct } from "../../services/shoppingCart.js";
import "./Product.scss";

class Product extends Component {
    handleClick() {
        window.location = `/products/${this.props.product._id}`;
    }
    handleForm(e){
        e.preventDefault();
        addProduct(this.props.product._id, 1);
    }

    render() {
        const details = this.props.product;
        const title = details.Title.length > 30 ?
        details.Title.substr(0, 30) + "..." : details.Title;

        return (
            <article className="product-details-contain" >
                
                <div className="product-image">
                    <img src={`/img/products/${details.Thumb}`} alt={details.Title} className="image"/>
                </div>
                <div className="product-details">
                    <h4 className="product-title" onClick={this.handleClick.bind(this)}>{title}</h4>
                    <div className="product-price-cart">
                        <div className="product-price">$ {parseFloat(details.Price).toFixed(2)}</div>
                        <div className="product-cart" onClick={this.handleForm.bind(this)}><i className="fas fa-cart-plus fa-2x"></i></div>
                    </div>
                </div>
            </article>
        );
    }
}

export default Product;
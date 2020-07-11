import React, { Component } from "react";

import "./ManageProduct.scss";

class ListProduct extends Component {
    constructor() {
        super();

        this.state = {
            detailsState: ""
        };
    }
    
    toggleDetails(e) {
        e.preventDefault();

        if(this.state.detailsState === "") {
            this.setState({detailsState: "active"});
        } else {
            this.setState({detailsState: ""});
        }
    }

    editProduct() {
        this.props.editProduct(this.props.product);
    }

    deleteProduct() {
        this.props.deleteProduct(this.props.product._id);
    }

    render() {
        const details = this.props.product;
        const arrowClass = this.state.detailsState === "" ? "fa-sort-down" : "fa-sort-up";

        return (
            <tr>
                <th className="id-product">{details._id}</th>
                <th className="name-product">{details.Title}</th>
                <th className="des-product">{details.Description}</th>
                <th className="price-product">{details.Price}</th>
                <th className="quantity-product">{details.Quantity}</th>
                <th className="change-product" onClick={this.editProduct.bind(this)}>Change</th>
                <th className="delete-product" onClick={this.deleteProduct.bind(this)}>Delete</th>
            </tr>
        );
    }
}

export default ListProduct;
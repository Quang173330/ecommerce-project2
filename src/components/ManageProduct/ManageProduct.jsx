import React, { Component } from "react";

import "./ManageProduct.scss";

class ManageProduct extends Component {
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
            <article className="manage-product">
                <div className="main">
                    <img src={`/img/products/${details.Thumb}`} alt={details.Title}/>
                    <p className="title">
                        {details.Title}
                    </p>
                    <div className="view-all-details">
                        <a onClick={this.toggleDetails.bind(this)}>
                            View all details <i className={`fas ${arrowClass}`}></i>
                        </a>
                        <div className="buttons">
                            <button className="delete" onClick={this.deleteProduct.bind(this)}>
                                <i className="fas fa-trash"></i>
                            </button>
                            <button className="edit" onClick={this.editProduct.bind(this)}>
                                <i className="fas fa-pencil-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`details ${this.state.detailsState}`}>
                    <p className="id">Id: <span>{details._id}</span></p>
                    <p className="description">Description: <span>{details.Description}</span></p>
                    <p className="price">Price: <span>{parseFloat(details.Price).toFixed(2)}</span></p>
                    <p className="quantity">Quantity: <span>{details.Quantity}</span></p>
                </div>
            </article>
        );
    }
}

export default ManageProduct;
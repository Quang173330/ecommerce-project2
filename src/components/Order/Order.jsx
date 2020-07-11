import React, { Component } from "react";
import Product from "./Product/Product.jsx";

import "./Order.scss";
const orders= require("../../../server/controllers/orders.controller");
class Order extends Component {
    constructor() {
        super();
    }

    updateState() {
        const detail = this.props.order;
        let state="";
        if(detail.State=="Shipping"){
            state="Delivered";
        } else{
            state="Order canceled";
        }
        fetch("/api/orders/update/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id : detail._id,
                state:state
            })
        }).then(res=> res.json()).then(res=>{
            if(res.status){
                console.log(res.local);

                window.location=res.local;
            }
        })
    }
    Order(){
        const details = this.props.order;
        const products = details.Products.map((products, index) => {
            return <Product product={products} key={index}/>
        });

        const arrowClass = this.state.viewProductsState === "" ? "fa-sort-down" : "fa-sort-up";
        if(details.State==="Shipping"){
            return(
            <div >
                <div className="details">
                    <div className="name-button">
                    <p className="total">Name:  {details.Name}</p>
                    <button className="button-state" onClick={this.updateState.bind(this)}>Delivered</button>
                    </div>
                    <p className="id">Address: {details.Address}</p>
                    <p className="date">Total: $ {details.Total}</p>
                    <p className="date">Id Order: {details._id}</p>
                    <p className="state">State: {details.State}</p>
                </div>
                <div className="view-products">
                    <a href="#" onClick={this.toggleViewProducts.bind(this)}>
                        View products <i className={`fas ${arrowClass}`}></i>
                    </a>
                </div>
                <div className={`order-products-container ${this.state.viewProductsState}`}>
                    {products}                </div>
            </div>   
            );        
        } else if(details.State=="Orders are being processed"){
            return(
            <div >
                <div className="details">
                    <div className="name-button">
                    <p className="total">Name:  {details.Name}</p>
                    <button className="button-state cancled" onClick={this.updateState.bind(this)}>Canceled order</button>
                    </div>
                    <p className="id">Address: {details.Address}</p>
                    <p className="date">Total: $ {details.Total}</p>
                    <p className="date">Id Order: {details._id}</p>
                    <p className="state">State: {details.State}</p>
                </div>
                <div className="view-products">
                    <a href="#" onClick={this.toggleViewProducts.bind(this)}>
                        View products <i className={`fas ${arrowClass}`}></i>
                    </a>
                </div>
                <div className={`order-products-container ${this.state.viewProductsState}`}>
                    {products}
                </div>
            </div> 
            );
        } else{
            return(
            <div >
            <div className="details">
                <div className="name-button">
                <p className="total">Name:  {details.Name}</p>
                </div>
                <p className="id">Address: {details.Address}</p>
                <p className="date">Total: $ {details.Total}</p>
                <p className="date">Id Order: {details._id}</p>
                <p className="state">State: {details.State}</p>
            </div>
            <div className="view-products">
                <a href="#" onClick={this.toggleViewProducts.bind(this)}>
                    View products <i className={`fas ${arrowClass}`}></i>
                </a>
            </div>
            <div className={`order-products-container ${this.state.viewProductsState}`}>
                {products}
            </div>
            </div>
            ); 
        }
    }
    render() {
        const details = this.props.order;

        const products = details.Products.map((products, index) => {
            return <Product product={products} key={index}/>
        });

        const arrowClass = this.state.viewProductsState === "" ? "fa-sort-down" : "fa-sort-up";

        return (
            <div className="order">
                {this.Order()}
            </div>
        );
    }
}

export default Order;
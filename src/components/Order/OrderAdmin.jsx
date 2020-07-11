import React, { Component } from "react";

const orders= require("../../../server/controllers/orders.controller");
class Order extends Component {
    constructor() {
        super();

    }


    deleteOrder(){
        const detail = this.props.order;
        fetch("/api/orders/deleteById/",{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id : detail._id,
            })     
        }).then(res=> res.json()).then(res=>{
            if(res.status){
                console.log(res.local);

                window.location="manage-orders";
            }
        })
    }
    updateState() {
        const detail = this.props.order;
        
        fetch("/api/orders/update/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id : detail._id,
                state:"Shipping"
            })
        }).then(res=> res.json()).then(res=>{
            if(res.status){
                console.log(res.local);

                window.location="manage-orders";
            }
        })
    }
    Order(){
        const details = this.props.order;
        if(details.State==="Delivered"||details.State==="Order canceled"){
            return(
                    <th className="change-order" onClick={this.updateState.bind(this)}>Delete Order</th> 
            );        
        } else if(details.State=="Orders are being processed"){
            return(
                <th className="change-order" onClick={this.updateState.bind(this)}>Change state be shipping</th> 
            );
        } else{
            return(
                <th className="change-order" ></th> 

            ); 
        }
    }
    render() {

        const details = this.props.order;

        return (
            <tr>
                    <th className="id-order">{details._id}</th>
                    <th className="name-order">{details.Name}</th>
                    <th className="email-order">{details.Email}</th>
                    <th className="phone-order">{details.Phone}</th>
                    <th className="address-order">{details.Address}</th>
                    <th className="total-order">{details.Total}</th>
                    <th className="state-order">{details.State}</th>
                    {this.Order()}
            </tr>
        );
    }
}

export default Order;
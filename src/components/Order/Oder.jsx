import React, { Component } from "react";

const orders= require("../../../server/controllers/orders.controller");
class Oder extends Component {
    constructor() {
        super();

        this.state = {
            viewProductsState: ""
        };
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
        if(details.State==="Shipping"){
            return(
                    <th className="change-order" onClick={this.updateState.bind(this)}>Delivered</th>
            );        
        } else if(details.State=="Orders are being processed"){
            return(
                    <th className="change-order" onClick={this.updateState.bind(this)}>Cancled Order</th>
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

export default Oder;
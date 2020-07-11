import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Order from "../../components/Order/OrderAdmin.jsx";
import Loader from "../../components/Loader/Loader.jsx";

class ManageOrders extends Component{
    constructor() {
        super();

        this.state = {
            orders: [],
            isLoading: true
        };
    }
    UNSAFE_componentWillMount() {
        fetch("/api/orders/getAllOrders/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token
            }
        })
        .then(res => res.json())
        .then(res => this.setState({orders: res, isLoading: false}));
    }
    getOrders() {
        if(this.state.orders.length) {
            const orders = this.state.orders.map((order, index) => {
                
                return <Order order={order} key={index}/>
                
            });
    
            return orders;
        } else {
            return (
                <h1>You not have orders.</h1>
            );
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Loader active={this.state.isLoading}/>

                <main className="orders-container">
                    {this.getOrders()}
                </main>
            </div>
        );
    }
}
export default ManageOrders;
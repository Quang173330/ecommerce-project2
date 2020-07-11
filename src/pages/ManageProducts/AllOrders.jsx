import React,{Component} from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Dashboard from "../../components/Admin/Dashboard.jsx";
import {adminPage} from "../../services/admin.js";
import Loader from "../../components/Loader/Loader.jsx";
import Order from "../../components/Order/OrderAdmin.jsx";
import "./styles/AllOrders.scss";
class AllProducts extends Component{
    constructor() {
        super();
        adminPage();

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
    render(){
        return(
            <div>
                <Navbar />
                <Loader active={this.state.isLoading}/>
                <div className="admin-contain">
                    <Dashboard />
                    <table className="table-orders">
                        <thead>
                            <tr>
                                <th className="id-order">ID</th>
                                <th className="name-order">Name</th>
                                <th className="email-order">Email</th>
                                <th className="phone-order">Phone</th>
                                <th className="address-order">Address</th>
                                <th className="total-order">Total</th>
                                <th className="state-order">State</th>
                                <th className="change-order"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getOrders()}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}
export default AllProducts;
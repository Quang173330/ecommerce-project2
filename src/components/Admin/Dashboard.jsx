import React,{Component} from "react";

import "./styles/dashboard.scss";


class Dashboard extends Component{
    render(){
        return(
            <div className="dashboard">
                <ul className="list-admin">
                    <li className="list-dashboard"><a className="a-dashboard" href="#"> Dashboard</a></li>
                    <li className="list-item"><a className="a-item" href="/manage-products/add-product">Add Product</a></li>
                    <li className="list-item"><a className="a-item" href="/manage-products/">Manage Products</a></li>
                    <li className="list-item"><a className="a-item" href="/manage-orders/">Manage Orders</a></li>
                    <li className="list-item"><a className="a-item" href="/manage-users/">Manage Users</a></li>
                </ul>
            </div>
        )
    }
}
export default Dashboard;
import React,{Component} from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Dashboard from "../../components/Admin/Dashboard.jsx";
import {adminPage} from "../../services/admin.js";
import Loader from "../../components/Loader/Loader.jsx";
import User from "../../components/Order/UserAdmin.jsx";
import "./styles/AllOrders.scss";
class AllUsers extends Component{
    constructor() {
        super();
        adminPage();

        this.state = {
            users: [],
            isLoading: true
        };
    }
    UNSAFE_componentWillMount() {
        fetch("/api/users/getAllUser/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token
            }
        })
        .then(res => res.json())
        .then(res => this.setState({users: res, isLoading: false}));
    }
    getUsers() {
        if(this.state.users.length) {
            const users = this.state.users.map((user, index) => {
                
                return <User user={user} key={index}/>
                
            });
    
            return users;
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.getUsers()}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}
export default AllUsers;
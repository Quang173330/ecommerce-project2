import React,{Component} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Dashboard from "../components/Admin/Dashboard.jsx";


class Admin extends Component{
    render(){
        return(
            <div>
                <Navbar />
                <div className="admin-contain">
                    <Dashboard />
                </div>
            </div>
        )
    }
}
export default Admin;
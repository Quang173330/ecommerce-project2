import React, { Component } from "react";
import DropDown from "./DropDown/DropDown.jsx";

import "./Navbar.scss";

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            navbarActive: false,
            userStatus: false,
            adminStatus: false,
            menu: "",
            name:"",
            categories:[],
            
        };

        this.handleNavbar = this.handleNavbar.bind(this);
    }

    UNSAFE_componentWillMount() {
        fetch("/api/users/checkUserToken/",
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({userStatus: res.status});
            
            if(res.status) {
                this.setState({name:res.userData.Name})
                if(res.userData.Permits === "admin") {
                    this.setState({adminStatus: true});
                }
            }
        });
        fetch("/api/categories/getCategories")
        .then(res => res.json())
        .then(res => this.setState({categories: res}));
    }

    handleNavbar() {
        this.setState({navbarActive: !this.state.navbarActive});
    }
    categories(){
        if(this.state.categories.length){
            console.log(this.state.categories)
            var a=[];
            for(var i=0;i<this.state.categories.length;i++){
                a.push(
                    {
                        name:this.state.categories[i].Name,
                        href:`/category/${this.state.categories[i].Name}`
                    }
                )
            }
            console.log(a);
            return(
                <div className="categories">
                    <DropDown dropdown={
                        {
                            name:"Categories",
                            items: a
                        }
                    }
                
                    />
                </div>
            )
        }
    }

    getAdminMenu() {
        if(this.state.adminStatus) {
            return (
                <a className="item" href="/manage-products">Admin</a>
            );
        }
    }

    getLinks() {
        if(this.state.userStatus) {
            return (
                <div className="links">
                    <a className="item" href="/">Home</a>
                    <a className="item" href="/cart/">Shopping Cart</a>

                    {this.getAdminMenu()}
                    
                    <DropDown dropdown={{
                        name: this.state.name,
                        items: [
                            {
                                name: "Configuration",
                                href: "/my-account/configuration"
                            },
                            {
                                name: "My orders",
                                href: "/my-account/orders"
                            },
                            {
                                name: "Close Session",
                                href: "/my-account/close-session"
                            }
                        ]
                    }}/>
                    
                </div>
            );
        } else {
            return (
                <div className="links">
                    <a className="item" href="/">Home</a>
                    <a className="item" href="/cart/">Shopping Cart</a>
                    <a className="item" href="/register/">Register</a>
                    <a className="item" href="/login/">Login</a>
                </div>
            );
        }
    }

    render() {
        const navbarClass = this.state.navbarActive ? "active" : "";

        return (
            <header>
                <nav className={navbarClass}>
                    <div className="logo-cate">
                    <div className="logo">
                        <a href="/">
                            <img src="/img/icon.png" alt="Shopping Center Icon" height="60"/>
                        </a>
                        
                    </div>
                    {this.categories()}
                    </div>
                    <button className="btn" onClick={this.handleNavbar}>
                        <i className="fas fa-bars"></i>
                    </button>

                    {this.getLinks()}
                </nav>
            </header>
        );
    }
}

export default Navbar;
import React, { Component } from "react";

class DropDown extends Component {
    constructor() {
        super();

        this.state = {
            menu: ""
        };
    }

    toggleMenu() {
        if(this.state.menu === "") {
            this.setState({menu: "active"});
        } else {
            this.setState({menu: ""});
        }
    }

    render() {
        const dropdownArrowClass = this.state.menu === "" ? "fa-sort-down" : "fa-sort-up";
        const dropdownDetails = this.props.dropdown;

        const items = dropdownDetails.items.map((item, index) => {
            return (
                <li key={index}>
                    <a href={item.href}>{item.name}</a>
                </li>
            );
        });

        return (
            <div
            className="dropdown-menu item"
            href="#"
            onClick={this.toggleMenu.bind(this)}>
                {dropdownDetails.name} <i className={`fas ${dropdownArrowClass}`}></i>

                <ul className={`menu ${this.state.menu}`} onMouseLeave={this.toggleMenu.bind(this)}>
                    {items}
                </ul>
            </div>
        );
    }
}

export default DropDown;
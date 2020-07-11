import React, { Component } from "react";

const orders= require("../../../server/controllers/orders.controller");
class Order extends Component {
    constructor() {
        super();

    }
    render() {

        const details = this.props.user;

        return (
            <tr>
                    <th className="id-order">{details._id}</th>
                    <th className="name-order">{details.Username}</th>
                    <th className="email-order">{details.Email}</th>
            </tr>
        );
    }
}

export default Order;
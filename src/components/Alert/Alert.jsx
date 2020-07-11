import React, { Component } from "react";

import "./Alert.scss";

class Alert extends Component {
    constructor() {
        super();

        this.state = {
            alerts: []
        };

        this.addAlert = this.addAlert.bind(this);
    }

    addAlert(type, message) {
        const alerts = this.state.alerts;
        const index = alerts.length;

        alerts.push({
            type: type,
            message: message,
            status: ""
        });

        this.setState({alerts: alerts});

        setTimeout(() => {
            alerts[index].status = "fade";
            this.setState({alerts: alerts});
        }, 5000);
    }

    render() {
        const alerts = this.state.alerts.map((alert, index) => {
            return (
                <div className={`alert ${alert.type} ${alert.status}`} key={index}>
                    {alert.message}
                </div>
            );
        });

        return (
            <div className="alerts-container">
                {alerts}
            </div>
        );
    }
}

export default Alert;
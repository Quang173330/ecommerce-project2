import React, { Component } from "react";

import "./Loader.scss";

class Loader extends Component {
    render() {
        const loaderClass = this.props.active ? "active" : "";

        return (
            <div className={`loader-container ${loaderClass}`}>
                <div className="loader"></div>
            </div>
        );
    }
}

export default Loader;
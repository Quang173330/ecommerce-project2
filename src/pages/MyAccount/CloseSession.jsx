import { Component } from "react";

class CloseSession extends Component {
    constructor() {
        super();

        window.localStorage.removeItem("token");
        window.location.href = "/";
    }
}

export default CloseSession;
import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import { validateUsername, validatePassword, validateEmail } from "../services/validators.js";
import Alert from "../components/Alert/Alert.jsx";
import Loader from "../components/Loader/Loader.jsx";

import "../Formulary.scss";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            isLoading: false
        };
        this.alerts = React.createRef();

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        if(e.target.id === "username") {
            this.setState({username: e.target.value});
        } else if(e.target.id === "password") {
            this.setState({password: e.target.value});
        }
    }

    handelForm(e) {
        e.preventDefault();

        const { username, password } = this.state;
        this.setState({errorMessage: ""});

        if(!validateUsername(username)) {
            this.setState({errorMessage: "The username must have at least 4 characters"});
            return;
        } else if(!validatePassword(password)) {
            this.setState({errorMessage: "The password must have at least 6 characters"});
            return;
        }

        this.setState({isLoading: true});

        fetch("/api/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({isLoading: false});
            if(res.status) {
                window.localStorage.setItem("token", res.token);
                window.location = "/";
            } else {
                this.alerts.current.addAlert("error", res.message);
            }
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Alert ref={this.alerts}/>
                <Loader active={this.state.isLoading}/>
                <div className="form-container">
                    <form onSubmit={this.handelForm.bind(this)}>

                        <h2>Login</h2>
                        <input
                        type="text"
                        id="username"
                        onChange={this.handleInput}
                        placeholder="Username"/>

                        <input
                        type="password"
                        id="password"
                        onChange={this.handleInput}
                        placeholder="Password"/>

                        <button>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
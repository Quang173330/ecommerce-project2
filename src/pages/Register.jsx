import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import { validateUsername, validatePassword, validateEmail } from "../services/validators.js";
import Alert from "../components/Alert/Alert.jsx";
import Loader from "../components/Loader/Loader.jsx";

import "../Formulary.scss";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            errorMessage: "",
            isLoading: false
        };
        this.alerts = React.createRef();

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        if(e.target.id === "username") {
            this.setState({username: e.target.value});
        } else if(e.target.id === "email") {
            this.setState({email: e.target.value});
        } else if(e.target.id === "password") {
            this.setState({password: e.target.value});
        } else if(e.target.id === "repeat-password") {
            this.setState({repeatPassword: e.target.value});
        }
    }

    handelForm(e) {
        e.preventDefault();

        const { username, email, password, repeatPassword } = this.state;
        this.setState({errorMessage: ""});

        if(!validateUsername(username)) {
            this.setState({errorMessage: "The username must have at least 4 characters"});
            return;
        } else if(!validateEmail(email)) {
            this.setState({errorMessage: "The email is invalid"});
            return;
        } else if(!validatePassword(password)) {
            this.setState({errorMessage: "The password must have at least 6 characters"});
            return;
        } else if(password !== repeatPassword) {
            this.setState({errorMessage: "Passwords do not match"});
            return;
        }

        this.setState({isLoading: true});

        fetch("/api/users/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({isLoading: false});
            if(res.status) {
                this.alerts.current.addAlert("success", "You have successfully registered");
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

                        <h2>Register</h2>
                        <input
                        type="text"
                        id="username"
                        onChange={this.handleInput}
                        placeholder="Username"/>

                        <input
                        type="email"
                        id="email"
                        onChange={this.handleInput}
                        placeholder="Email"/>

                        <input
                        type="password"
                        id="password"
                        onChange={this.handleInput}
                        placeholder="Password"/>

                        <input
                        type="password"
                        id="repeat-password"
                        onChange={this.handleInput}
                        placeholder="Repeat Password"/>

                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
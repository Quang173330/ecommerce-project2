import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import { validateUsername, validatePassword, validateEmail } from "../../services/validators.js";

import "./styles/Configuration.scss";

class Configuration extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            email: "",

            usernameInput: "",
            emailInput: "",

            newPassword: "",
            repeatNewPassword: "",
            currentPassword: "",

            usernameForm: "",
            emailForm: "",
            passwordForm: ""
        };

        this.alerts = React.createRef();

        this.toggleForms = this.toggleForms.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    UNSAFE_componentWillMount() {
        fetch("/api/users/getUserData/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                const {Username, Email} = res.userData;

                this.setState({
                    username: Username,
                    usernameInput: Username,
                    email: Email,
                    emailInput: Email
                });
            }
        });
    }

    toggleForms(form) {
        if(form === "username") {
            if(this.state.usernameForm === "") {
                this.setState({usernameForm: "active"});
            } else {
                this.setState({usernameForm: ""});
            }
        } else if(form === "email") {
            if(this.state.emailForm === "") {
                this.setState({emailForm: "active"});
            } else {
                this.setState({emailForm: ""});
            }
        } else {
            if(this.state.passwordForm === "") {
                this.setState({passwordForm: "active"});
            } else {
                this.setState({passwordForm: ""});
            }
        }
    }

    handleInput(e) {
        if(e.target.id === "username") {
            this.setState({usernameInput: e.target.value});
        } else if(e.target.id === "email") {
            this.setState({emailInput: e.target.value});
        } else if(e.target.id === "newPassword") {
            this.setState({newPassword: e.target.value});
        } else if(e.target.id === "repeatNewPassword") {
            this.setState({repeatNewPassword: e.target.value});
        } else if(e.target.id === "currentPassword") {
            this.setState({currentPassword: e.target.value});
        }
    }

    handleUsernameForm(e) {
        e.preventDefault();

        if(!validateUsername(this.state.usernameInput)) {
            this.alerts.current.addAlert("error", "The username must have at least 4 characters");
            return;
        }

        fetch("/api/users/changeUsername/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.usernameInput
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                this.alerts.current.addAlert("success", "The username has been changed successfully");
                this.setState({username: this.state.usernameInput});
                this.toggleForms("username");
            } else {
                this.alerts.current.addAlert("error", res.message);
            }
        });
    }

    handleEmailForm(e) {
        e.preventDefault();

        if(!validateEmail(this.state.emailInput)) {
            this.alerts.current.addAlert("error", "The email is invalid");
            return;
        }

        fetch("/api/users/changeEmail/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.emailInput
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                this.alerts.current.addAlert("success", "The email has been changed successfully");
                this.setState({email: this.state.emailInput});
                this.toggleForms("email");
            } else {
                this.alerts.current.addAlert("error", res.message);
            }
        });
    }

    handlePasswordForm(e) {
        e.preventDefault();

        if(!validatePassword(this.state.newPassword)) {
            this.alerts.current.addAlert("error", "The new password must have at least 6 characters");
            return;
        } else if(this.state.newPassword !== this.state.repeatNewPassword) {
            this.alerts.current.addAlert("error", "Passwords do not match");
            return;
        }

        fetch("/api/users/changePassword/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newPassword: this.state.newPassword,
                currentPassword: this.state.currentPassword
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                this.alerts.current.addAlert("success", "The password has been changed successfully");
                this.toggleForms("password");
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
                <main className="configuration-container">
                    <div className="username">
                        <h2>{this.state.username}</h2>

                        <button
                        className="edit-button"
                        onClick={() => {this.toggleForms("username")}}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                    <div className="email">
                        <h2>{this.state.email}</h2>

                        <button
                        className="edit-button"
                        onClick={() => {this.toggleForms("email")}}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                    <div className="password">
                        <h2>Password</h2>

                        <button
                        className="edit-button"
                        onClick={() => {this.toggleForms("password")}}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                </main>

                <div className={`float-form-container ${this.state.usernameForm}`}>
                    <div className="float-form">
                        <form onSubmit={this.handleUsernameForm.bind(this)}>
                            <h3 className="title">Change username</h3>

                            <input
                            type="text"
                            value={this.state.usernameInput}
                            onChange={this.handleInput}
                            id="username"
                            autoComplete="off"/>

                            <button className="save-button">
                                Save
                            </button>
                            <button
                            className="cancel-button"
                            type="button"
                            onClick={() => {this.toggleForms("username")}}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
                
                <div className={`float-form-container ${this.state.emailForm}`}>
                    <div className="float-form">
                        <form onSubmit={this.handleEmailForm.bind(this)}>
                            <h3 className="title">Change email</h3>

                            <input
                            type="text"
                            value={this.state.emailInput}
                            onChange={this.handleInput}
                            id="email"
                            autoComplete="off"/>

                            <button className="save-button">
                                Save
                            </button>
                            <button
                            className="cancel-button"
                            type="button"
                            onClick={() => {this.toggleForms("email")}}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            
                <div className={`float-form-container ${this.state.passwordForm}`}>
                    <div className="float-form">
                        <form onSubmit={this.handlePasswordForm.bind(this)}>
                            <h3 className="title">Change password</h3>

                            <input
                            type="password"
                            placeholder="New password"
                            onChange={this.handleInput}
                            id="newPassword"
                            autoComplete="off"/>

                            <input
                            type="password"
                            placeholder="Repeat new password"
                            onChange={this.handleInput}
                            id="repeatNewPassword"
                            autoComplete="off"/>

                            <input
                            type="password"
                            placeholder="Current password"
                            onChange={this.handleInput}
                            id="currentPassword"
                            autoComplete="off"/>

                            <button className="save-button">
                                Save
                            </button>
                            <button
                            className="cancel-button"
                            type="button"
                            onClick={() => {this.toggleForms("password")}}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Configuration;
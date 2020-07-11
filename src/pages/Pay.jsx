import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import { loadProducts, getCart } from "../services/shoppingCart.js";
import Alert from "../components/Alert/Alert.jsx";
import Loader from "../components/Loader/Loader.jsx";
import {} from "../services/shoppingCart.js"
import "./styles/Pay.scss";
class Pay extends Component{
    constructor() {
        super();

        this.state = {
            name:"",
            email:"",
            phone:"",
            addres:"",
            items: [],
            isLoading: true,

        };
        this.alerts = React.createRef();
        this.handleInput = this.handleInput.bind(this);
    }
    UNSAFE_componentWillMount() {
        loadProducts()
        .then(res => this.setState({items: res, isLoading: false}));
        console.log(this.state.items);
    }
    handleInput(e) {
        if(e.target.id === "name") {
            this.setState({name: e.target.value});
        } else if(e.target.id === "email") {
            this.setState({email: e.target.value});
        } else if(e.target.id === "phone") {
            this.setState({phone: e.target.value});
        } else if(e.target.id === "address") {
            this.setState({address: e.target.value});
        }
    }
    handelForm(e) {
        e.preventDefault();

        const { name, email, phone, address } = this.state;
        this.setState({errorMessage: ""});

        this.setState({isLoading: true});

        fetch("/api/checkout/cart", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone:phone,
                address:address,
                cart: getCart()

            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({isLoading: false});
            if(res.status) {
                window.location = res.redirectURL;
            } else {
                this.props.alerts.addAlert("error", res.error);
            }
        });
    }
    getProducts() {
        if(this.state.items.length) {
            var subtotal = 0;

            const items = this.state.items.map((item, index) => {
                subtotal += item.Price * item.cartQuantity;
            return (<div className="subtotal">
                        <p>{item.Title}</p>
                        <p>$ {item.Price}</p>
                    </div>);
            });

            const delivery = subtotal > 50 ? 0 : 10;
            const total = subtotal + delivery;

            const deliveryText = delivery ? "$ 10" : "Free";

            return (
                <main className="cart-container">
                    <div className="pay-container">
                        <div className="pay-contain-1">
                        <div className="text">Billing address</div>
                        <form onSubmit={this.handelForm.bind(this)} className="info-checkout">
                            <div className="input ">
                                <label className="label" htmlFor="">Name</label>
                                <input type="text" id="name" onChange={this.handleInput} className=" input-1 name-user"/>
                            </div>
                            <div className="input ">
                                <label className="label" htmlFor="">Phone</label>
                                <input type="text" id="phone" onChange={this.handleInput} className=" input-1 phone-user"/>
                            </div>
                            <div className="input ">
                                <label className="label" htmlFor="">Email</label>
                                <input type="email" id="email" onChange={this.handleInput} className=" input-1 email-user"/>
                            </div>
                            <div className="input ">
                                <label className="label" htmlFor="">Address</label>
                                <textarea type="textarea" id="address" name="" onChange={this.handleInput} className="input-2" ></textarea>
                            </div>
                            <div className="input ">
                                <label className="payment-text label">Payment</label>
                                <div className="payment-choose">
                                    <div className="choose-1">
                                        <input name="payment" className="pay-money"  type="radio"/>
                                        <label className="label1" htmlFor="">Payment on delivery</label>
                                    </div>
                                    <div className="choose-2">
                                        <input name="payment" type="radio" disabled className="pay-card"/>
                                        <label className="label1" htmlFor="">Payment by international card</label>
                                    </div>
                                    <div className="choose-3">
                                        <input name="payment" type="radio" disabled className="pay-internet"/>
                                        <label className="label1" htmlFor="">Payment by internet banking</label>
                                    </div>
                                </div>
                            </div>
                            <button className="button-checkout">Payment</button>
                        </form>
                        </div>
                    </div>

                    <div className="checkout-container">
                        <p className="title">Cart Total</p>
                        {items}
                        <div className="subtotal">
                            <p>Subtotal</p>
                            
                            <p>$ {subtotal}</p>
                        </div>

                        <div className="delivery">
                            <p>Delivery</p>
                            <p>{deliveryText}</p>
                        </div>

                        <div className="total">
                            <p>Total</p>
                            
                            <p>$ {total}</p>
                        </div>
                    </div>
                </main> 
            );
        } else {
            return (
                <div className="cart-text-container">
                    <h2>Error</h2>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <Alert ref={this.alerts}/>
                <Loader/>
                <Navbar/>
                {this.getProducts()}
            </div>
        );
    }
}
export default Pay;
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Products from "../pages/Products.jsx";
import Categories from "../pages/Categories.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import Configuration from "../pages/MyAccount/Configuration.jsx";
import Orders from "../pages/MyAccount/Orders.jsx";
import CloseSession from "../pages/MyAccount/CloseSession.jsx";
import AddProduct from "../pages/ManageProducts/AddProduct.jsx";
import ManageProducts from "../pages/ManageProducts/ManageProducts.jsx";
import AllProducts from "../pages/ManageProducts/AllProducts.jsx";
import AllOrders from "../pages/ManageProducts/AllOrders.jsx";
import AllUsers from "../pages/ManageProducts/AllUsers.jsx";
import Pay from "../pages/Pay.jsx";
import Admin from "../pages/Admin.jsx";
import "./App.scss";


class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register/" component={Register} />
                <Route path="/login/" component={Login} />
                <Route path="/category/:name" component={Categories}/>
                <Route path="/products/:id" component={Products} />
                <Route path="/cart/" component={Cart} />
                <Route path="/pay/" component={Pay} />
                <Route path="/checkout/:type" component={Checkout} />

                <Route path="/my-account/configuration/" component={Configuration}/>
                <Route path="/my-account/orders/" component={Orders}/>
                <Route path="/my-account/close-session/" component={CloseSession} />

                <Route path="/admin/" component={Admin}/>
                <Route path="/manage-products/products/" component={ManageProducts} />
                <Route path="/manage-products/add-product/" component={AddProduct}/>
                <Route path="/manage-users/" component={AllUsers}/>
                <Route path="/manage-products/" component={AllProducts}/>
                
                
                <Route path="/manage-orders/" component={AllOrders} />

            </Switch>
        );
    }
}

export default App;
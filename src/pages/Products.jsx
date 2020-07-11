import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";
import Loader from "../components/Loader/Loader.jsx";

class Products extends Component {
    constructor() {
        super();

        this.state = {
            product: Object,
            isLoading: true
        };
    }

    UNSAFE_componentWillMount() {
        const productId = this.props.match.params.id;
        
        fetch(`/api/products/getProductById/${productId}`)
        .then(res => res.json())
        .then(productData => this.setState({product: productData, isLoading: false}));
    }

    render() {
        const details = this.state.product;

        return (
            <div>
                <Navbar/>
                <Loader active={this.state.isLoading}/>
                <ProductDetails product={details}/>
            </div>
        );
    }
}

export default Products;
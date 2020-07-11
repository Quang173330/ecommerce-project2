import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Product from "../components/Product/Product.jsx";
import SearchProducts from "../components/SearchProducts/SearchProducts.jsx";
import Loader from "../components/Loader/Loader.jsx";

import "./styles/Home.scss";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            products: [],
            categories: []
        };

        this.search = this.search.bind(this);
    }
    UNSAFE_componentWillMount() {
        const nameCategory = this.props.match.params.name;
        
        fetch(`/api/products/getProductByCategory/${nameCategory}`)
        .then(res => res.json())
        .then(res => this.setState({products: res, isLoading: false}));
    }

    search(search) {
        this.setState({isLoading: true});
        fetch(`/api/products/searchProducts/${search}`)
        .then(res => res.json())
        .then(res => this.setState({products: res, isLoading: false}));
    }

    getProducts() {
        if(this.state.products.length) {
            const products = this.state.products.map((p, index) => {
                return <Product product={p} key={index} />
            });

            return (
                <div className="products-container">
                    {products}
                </div>
            );
        }else {
            return (
                <div className="products-text-container">
                    <h2>Results not found</h2>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Loader active={this.state.isLoading}/>
                <main>
                    <SearchProducts handleSearch={this.search} />
                    <div>
                        <h2>{this.props.match.params.name}</h2>
                        {this.getProducts()}
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;
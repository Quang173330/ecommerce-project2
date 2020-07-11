import React, { Component } from "react";
import Product from "../Product/Product.jsx";
import "./Categories.scss";

class Categories extends Component{

    constructor() {
        super();

        this.state = {
            isLoading: true,
            products: [],
        };
    }


    viewCategory(){
        const nameCategory= this.props.categories.Name;
        fetch(`/api/products/getProductByCategory/${nameCategory}`)
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
        }
    }
    render(){
        const category= this.props.categories;
        const name= category.Name;
        return(
            <div className="contain">
                <article className="category" onClick={this.viewCategory.bind(this)}>
                    <div className="content">
                        <h1>{name}</h1>
                    </div>
                </article>
                <div className="product">
                    {this.getProducts()}
                </div>
            </div>
        )
    }
    
} 
export default Categories;
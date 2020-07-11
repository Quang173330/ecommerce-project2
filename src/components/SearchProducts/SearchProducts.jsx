import React, { Component } from "react";

import "./SearchProducts.scss";

class SearchProducts extends Component {
    constructor() {
        super();

        this.state = {
            search: ""
        };
    }

    handleInput(e) {
        this.setState({search: e.target.value});
    }

    handleForm(e) {
        e.preventDefault();

        this.props.handleSearch(this.state.search);
    }

    render() {
        return (
            <div className="search-products-container">
                <form onSubmit={this.handleForm.bind(this)}>
                    <input
                    type="search"
                    placeholder="Search products"
                    onChange={this.handleInput.bind(this)} />
                    
                    <button>
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchProducts;
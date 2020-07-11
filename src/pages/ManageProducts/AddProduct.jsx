import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { adminPage } from "../../services/admin.js";
import Dashboard from "../../components/Admin/Dashboard.jsx"
import "./styles/AddProduct.scss";
import ImagePreview from "../../components/ImagePreview/ImagePreview.jsx";

class AddProduct extends Component {
    constructor() {
        super();

        // check if the user is an admin
        adminPage();

        this.state = {
            title: "",
            description: "",
            price: 0,
            quantity: 1,
            category:"",
            image: null,
            isLoading: false,
            categories:[],
        };

        this.alerts = React.createRef();

        this.handleInput = this.handleInput.bind(this);
        this.select=this.select.bind(this);
    }
    UNSAFE_componentWillMount() {
        fetch("/api/categories/getCategories")
        .then(res => res.json())
        .then(res => this.setState({categories: res}));
    }
    categories(){
        if(this.state.categories.length){
            console.log(this.state.categories)
            return this.state.categories.map((category) =>{
            return <option key={category._id} value={category.Name}>{category.Name}</option>;
            }
            );
        }
    }
    handleInput(e) {
        if(e.target.id === "title") {
            this.setState({title: e.target.value});
        } else if(e.target.id === "description") {
            this.setState({description: e.target.value});
        } else if(e.target.id === "price") {
            this.setState({price: e.target.value});
        } else if(e.target.id === "quantity") {
            this.setState({quantity: e.target.value});
        }
        else if(e.target.id === "category") {
            this.setState({category: e.target.value});
        }
    }
    select(){
        const cate = document.getElementById("category").value;
        this.setState({category:cate})
        console.log("category");
        console.log(this.state.category);
    }

    handleImage(image) {
        this.setState({image: image});
    }

    handleForm(e) {
        e.preventDefault();

        if(!this.state.image) {
            this.alerts.current.addAlert("error", "You must add an image");
            return;
        }
        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("image", this.state.image);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);
        formData.append("quantity", this.state.quantity);
        formData.append("category", this.state.category);

        this.setState({isLoading: true});

        fetch("/api/products/addProduct/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                window.location.href = "/products/" + res.productId;
            } else {
                this.alerts.current.addAlert("error", res.error);
            }

            this.setState({isLoading: false});            
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Loader active={this.state.isLoading}/>
                <Alert ref={this.alerts}/>


                <main className="add-product-container">
                    <Dashboard />
                    <form onSubmit={this.handleForm.bind(this)}>
                        <h2>Add Product</h2>

                        <input
                        type="text"
                        id="title"
                        onChange={this.handleInput}
                        placeholder="Title"
                        maxLength="100"
                        required />

                        <ImagePreview handleImage={this.handleImage.bind(this)}/>
                        <select id="category" className="select-category" onChange={this.select} >
                            {this.categories()}
                        </select>

                        <textarea
                        id="description"
                        placeholder="Description"
                        onChange={this.handleInput}
                        maxLength="1000"
                        required></textarea>

                        <input
                        type="number"
                        id="price"
                        onChange={this.handleInput}
                        placeholder="Price"
                        min="1"
                        step="0.01"
                        required/>

                        <input
                        type="number"
                        id="quantity"
                        onChange={this.handleInput}
                        placeholder="Quantity"
                        min="1"
                        required/>

                        <button type="submit">
                            Add product
                        </button>
                    </form>
                </main>
            </div>
        );
    }
}

export default AddProduct;
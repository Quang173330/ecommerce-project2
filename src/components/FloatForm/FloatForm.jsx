import React, { Component } from "react";
import ImagePreview from "../ImagePreview/ImagePreview.jsx";

import "../../styles/FloatForm.scss";

class FloatForm extends Component {
    constructor() {
        super();

        this.state = {
            id: "",
            title: "",
            description: "",
            image: "no-image",
            price: 0,
            quantity: 9,
            floatForm: "",
            isLoading: false,
            category:""
        };
        this.imagePreview = React.createRef();

        this.handleInput = this.handleInput.bind(this);
    }

    setDetails(id, title, description, image, price, quantity,category) {
        this.setState({
            id: id,
            title: title,
            description: description,
            price: price,
            quantity: quantity,
            category:category
            

        });
        this.imagePreview.current.setDetails(`/img/products/${image}`);
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
        } else if(e.target.id === "category") {
            this.setState({category: e.target.value});
        } 
    }

    handleForm(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", this.state.id);
        formData.append("title", this.state.title);
        formData.append("category", this.state.category);
        formData.append("image", this.state.image);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);
        formData.append("quantity", this.state.quantity);

        this.setState({isLoading: true});

        fetch("/api/products/editProduct/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            this.setState({isLoading: false});

            if(res.status) {
                this.toggleForm();
            }
        });
    }

    handleImage(image) {
        this.setState({image: image});
    }

    toggleForm() {
        if(this.state.floatForm === "") {
            this.setState({floatForm: "active"});
            document.body.style.overflowY = "hidden";
        } else {
            this.setState({floatForm: ""});
            document.body.style.overflowY = "auto";
        }
    }

    render() {
        return (
            <div className={`float-form-container ${this.state.floatForm}`}>
                <div className="float-form" style={{position: "absolute", top: "0"}}>
                    <form onSubmit={this.handleForm.bind(this)}>
                        <h3 className="title">Manage Product</h3>

                        <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInput}
                        placeholder="Title"
                        id="title"
                        maxLength="100"/>

                        <ImagePreview
                        handleImage={this.handleImage.bind(this)}
                        ref={this.imagePreview}/>
                        <input
                        type="text"
                        value={this.state.category}
                        id="category"
                        onChange={this.handleInput}
                        placeholder="Category"
                        maxLength="100"
                        />

                        <textarea
                        type="text"
                        value={this.state.description}
                        onChange={this.handleInput}
                        placeholder="Description"
                        id="description"
                        maxLength="1000"></textarea>

                        <input
                        type="number"
                        value={this.state.price}
                        id="price"
                        onChange={this.handleInput}
                        placeholder="Price"
                        min="1"
                        step="0.01"
                        required/>

                        <input
                        type="number"
                        value={this.state.quantity}
                        id="quantity"
                        onChange={this.handleInput}
                        placeholder="Quantity"
                        min="1"
                        required/>


                        <button className="save-button">
                            Save
                        </button>
                        <button
                        className="cancel-button"
                        type="button"
                        onClick={this.toggleForm.bind(this)}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default FloatForm;
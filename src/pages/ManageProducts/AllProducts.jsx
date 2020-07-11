import React,{Component} from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Dashboard from "../../components/Admin/Dashboard.jsx";
import ListProduct from "../../components/ManageProduct/ListProduct.jsx";
import {adminPage} from "../../services/admin.js";
import FloatForm from "../../components/FloatForm/FloatForm.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./styles/AllProducts.scss";
class AllProducts extends Component{
    constructor() {
        super();
        adminPage();

        this.state = {
            products: [],
            productDetails: null,
            search: "",
            isLoading: true
        };

        this.floatForm = React.createRef();
    }
    UNSAFE_componentWillMount() {
        fetch("/api/products/getProducts/")
        .then(res => res.json())
        .then(res => this.setState({products: res, isLoading: false}));
    }
    handleInput(e) {
        this.setState({search: e.target.value});
    }

    handleForm(e) {
        e.preventDefault();

        this.setState({isLoading: true});

        fetch(`/api/products/searchproducts/${this.state.search}`)
        .then(res => res.json())
        .then(res => this.setState({products: res, isLoading: false}));
    }

    editProduct(product) {
        const {_id, Title, Description, Thumb, Price, Quantity,Category} = product;

        this.floatForm.current.setDetails(_id, Title, Description, Thumb, Price, Quantity,Category);
        this.floatForm.current.toggleForm();
    }
    editProduct(product) {
        const {_id, Title, Description, Thumb, Price, Quantity,Category} = product;

        this.floatForm.current.setDetails(_id, Title, Description, Thumb, Price, Quantity,Category);
        this.floatForm.current.toggleForm();
    }
    deleteProduct(id) {
        this.setState({isLoading: true});

        fetch("/api/products/deleteProduct/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.status) {
                const products = this.state.products.filter(product => product._id !== id);
                this.setState({products: products, isLoading: false});
            }
        });
    }
    getProducts() {
        if(this.state.products.length) {
            return this.state.products.map((product, index) => {
                return <ListProduct
                product={product}
                editProduct={this.editProduct.bind(this)}
                deleteProduct={this.deleteProduct.bind(this)}
                key={index}/>;
            });
        } else {
            return (
                <h3 style={{textAlign: "center"}}>Results not found</h3>
            );
        }
    }
    render(){
        return(
            <div>
                <Navbar />
                <Loader active={this.state.isLoading}/>
                <FloatForm ref={this.floatForm}/>
                <div className="admin-contain">
                    <Dashboard />
                    <table className="table-products">
                        <thead>
                            <tr>
                                <th className="id-product">ID</th>
                                <th className="name-product">Name</th>
                                <th className="des-product">Description</th>
                                <th className="price-product">Price</th>
                                <th className="quantity-product">Quantity</th>
                                <th className="change-product">Change</th>
                                <th className="delete-product">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getProducts()}
                        </tbody>
                        </table>
                    
                </div>
            </div>
        )
    }
}
export default AllProducts;
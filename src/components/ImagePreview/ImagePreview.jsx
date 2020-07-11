import React, { Component } from "react";
import { validateImage } from "../../services/validators.js";

import "./ImagePreview.scss";

class ImagePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imagePreview: ""
        };
    }

    setDetails(imagePreview) {
        this.setState({imagePreview: imagePreview});
    }

    handleImage(e) {
        const image = e.target.files[0];

        if(image) {
            if(validateImage(image.type)) {
                this.props.handleImage(image);
                this.setState({imagePreview: URL.createObjectURL(image)})
            }
        }
    }

    deleteImage() {
        this.props.handleImage(null);
        this.setState({imagePreview: ""});
    }

    render() {
        const imagePreviewClass = this.state.imagePreview === "" ? "" : "active";

        return (
            <div className={`image-preview ${imagePreviewClass}`}>
                <label htmlFor="image">
                    Select a image
                </label>

                <div
                className="preview"
                style={
                    {background: `url(${this.state.imagePreview})`}
                }></div>

                <button
                className="remove-image"
                onClick={this.deleteImage.bind(this)}
                type="button">
                    <i className="fas fa-trash"></i>
                </button>

                <input
                type="file"
                id="image"
                onChange={this.handleImage.bind(this)}/>
            </div>
        );
    }
}

export default ImagePreview;
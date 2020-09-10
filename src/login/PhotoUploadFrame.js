import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone'
import AppContext from '../AppContext';

export default class PhotoUploadFrame extends Component {

    state = {
        isDragging: false,
        imgSrc: null,
    }

    onDrop = (files) => {
        this.setState({ isDragging: false })
        if (files.length === 0) {
            this.context.setError(true);
            this.context.setMessage("Only png and jpg files are allowed.")
            return;
        }
        const currentFile = files[0];
        const maxImgSize = 2 * 1024 * 1024;
        if (currentFile.size > maxImgSize) {
            this.context.setError(true);
            this.context.setMessage("Your image is too big, only 2MB images are allowed.")
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            let image = new Image();
            image.src = reader.result;
            image.onload = () => {
                if(image.width < 640 || image.height < 360) {
                    this.context.setError(true);
                    this.context.setMessage("Your image is too small, minimum 640x360 dimension is allowed.")
                }
                else if(image.width > 3840 || image.height > 2160) {
                    this.context.setError(true);
                    this.context.setMessage("Your image is too big, maximum 3840x2160 dimension is allowed.")
                }
                else {
                    this.props.onPreviewReady(currentFile);
                    this.setState({ imgSrc: reader.result })
                }
            }

        }
        reader.readAsDataURL(currentFile);
    }

    render() {
        return (
            <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                accept={["image/jpeg", "image/png"]}
                onDragEnter={() => this.setState({ isDragging: true })}
                onDragLeave={() => this.setState({ isDragging: false })}
                noKeyboard>
                {({ getRootProps, getInputProps }) => (
                    <div className="photoUploadWidget">
                        <div className={"photoUploadFrame" + (this.state.isDragging ? " photoUploadFrameDragOver" : "")}  {...getRootProps()}>
                            {this.state.imgSrc === null ?
                                <FontAwesomeIcon icon={faFileImage} className="imageUploadIcon" /> :
                                <img alt="Preview" src={this.state.imgSrc} className="previewImage" />}
                        </div>
                        <div className="imageUploadText">Drag an image to box above or click</div>
                        <input {...getInputProps()} />
                    </div>
                )}
            </Dropzone>
        );
    }

}
PhotoUploadFrame.contextType = AppContext;
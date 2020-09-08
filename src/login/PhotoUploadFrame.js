import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone'

export default class PhotoUploadFrame extends Component {

    onDrop = (files) => {
        console.log(files)
    }

    render() {
        return (
            <Dropzone
                onDrop={this.onDrop}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className="photoUploadWidget">
                        <div className="photoUploadFrame" {...getRootProps()}>
                            <FontAwesomeIcon icon={faFileImage} className="imageUploadIcon" />
                        </div>
                        <div>Drag an image to box above or </div>
                        <input {...getInputProps()}></input>
                        <progress></progress>

                    </div>
                )}
            </Dropzone>
        );
    }

}
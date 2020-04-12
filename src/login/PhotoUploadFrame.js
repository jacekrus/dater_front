import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PhotoUploadFrame extends Component {

    render() {
        return (
            <div className="photoUploadWidget">
                <div className="photoUploadFrame">
                    <FontAwesomeIcon icon={faFileImage} className="imageUploadIcon" />
                </div>
                <div>Drag an image to box above or </div><input type="file"></input>
                <progress></progress>
            </div>
        );
    }

}
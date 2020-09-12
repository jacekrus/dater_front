import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PhotoUploadFrame from '../login/PhotoUploadFrame';

export default class PhotoTape extends Component {

    constructor(props) {
        super(props)
        let arr = [];
        for (let i = 0; i < 4 - props.user.photos.length; i++) {
            arr = [...arr, "aaa"]
        }
        this.state = {
            newPhotos: arr,
        }
    }

    newImageAdded = (image) => {
        let photos = [image, ...this.state.newPhotos];
        photos.pop();
        console.log(photos)
        this.setState({ newPhotos: photos })
    }

    render() {
        const { user, editable } = this.props;
        const newPhotosLength = this.state.newPhotos.length
        const sum = user.photos.length + this.state.newPhotos.length
        const canAdd = user.photos.length + this.state.newPhotos.length < 4 && editable
        return (
            <div className="photoTape">
                {user.photos.map((each, index) => <img alt="img" key={index} src={each} className="photoTapeImg" />)}

                <PhotoUploadFrame mini onPreviewReady={(file, image) => this.newImageAdded(image)}/>
                <PhotoUploadFrame mini onPreviewReady={(file, image) => this.newImageAdded(image)}/>
                {/* <PhotoUploadFrame mini onPreviewReady={(file, image) => this.newImageAdded(image)}/> */}
            </div>
        )
    }
}
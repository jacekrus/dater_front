import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PhotoUploadFrame from '../login/PhotoUploadFrame';
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PhotoTape extends Component {

    render() {
        const { user, editable } = this.props;
        const arr = [...Array(4 - user.photos.length).keys()]
        return (
            <div className="photoTape">
                {user.photos.map((each, index) =>
                    <div className="positionRelative" key={index}>
                        <img alt="img" src={each} className="photoTapeImg" />
                        { editable ? 
                            <div className="previewButton previewButtonMiniature" title='Remove photo' onClick={() => this.props.onPhotoRemove(index)}>
                                <FontAwesomeIcon className="previewRemoveButtonIcon previewRemoveButtonIconMiniature" icon={faTimes} />
                            </div> : null
                        }
                        {index > 0 && editable ? <FontAwesomeIcon icon={faCheckCircle} className="previewProfileButtonIcon" title="Set as profile picture" onClick={() => this.props.onProfilePictureChange(index)} /> : null}
                    </div>
                )}
                {editable ? arr.map((each, index) => <PhotoUploadFrame key={index} mini onPreviewReady={this.props.onPreviewReady} onPreviewRemoved={this.props.onPreviewRemoved} />) : null}
            </div>
        )
    }
}
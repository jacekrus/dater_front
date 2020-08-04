import React from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const PhotoTape = ({user, editable}) => {

    return (
        <div className="photoTape">
            {user.photos.map((each, index) => <img alt="img" key={index} src={each} className="photoTapeImg" />)}
            {user.photos.length < 4 && editable ? <FontAwesomeIcon icon={faPlusCircle} className="addPhotoButton" title="Add photo"/> : null}
        </div>
    );
}
export default PhotoTape;
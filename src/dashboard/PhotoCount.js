import React from 'react';
import './MainLayoutStyles.css';

const PhotoCount = ({ currentPhoto, photoCount }) => {
    return (
        <div className='photoCountContainer'>
            {currentPhoto} / {photoCount}
        </div>
    );
}

export default PhotoCount;
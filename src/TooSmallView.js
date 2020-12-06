import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from "@fortawesome/free-solid-svg-icons";

const TooSmallView = () => {
    return (
        <div className="tooSmallView">
            <FontAwesomeIcon icon={faSadTear} className="tooSmallIcon" />
            <div className="tooSmallText">Your display resolution is too small...</div>
            <div className="tooSmallText font18">Minimum required is 1200x900. Please maximize the window <br />
                or possibly switch to a device with higher display resolution.
            </div>
        </div>
    );
}
export default TooSmallView;
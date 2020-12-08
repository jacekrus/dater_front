import React from 'react';
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScrollBottomIcon = ({ visible, onClick }) => {
    return (
        <div className="scrollBottomIconContainer">
            <FontAwesomeIcon icon={faArrowCircleDown} className={"sendMsgIcon scrollBottomIcon" + (visible ? " scrollBottomIconVisible" : "")}
                title={"Scroll bottom"} onClick={onClick} />
        </div>
    )
}
export default ScrollBottomIcon;
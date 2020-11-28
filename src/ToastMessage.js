import React from 'react'
import { faInfoCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastMessage = ({ message, error }) => {
    return (
        <div className="toastContainer">
            <FontAwesomeIcon icon={error ? faExclamationTriangle : faInfoCircle} className="toastIcon"/>
            <div className="toastText">{message}</div>
        </div>
    );
}
export default ToastMessage;
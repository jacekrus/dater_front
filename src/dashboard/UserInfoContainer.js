import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import UserInfoEditPanel from './UserInfoEditPanel';

export default class UserInfoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        }
    }

    onEditClicked = () => {
        this.setState(prevState => ({ isEdit: !prevState.isEdit }))
    }

    onSaveClicked = (value) => {
        this.props.onSaveClicked(value);
        this.onEditClicked();
    }

    render() {
        let { title, content, editable } = this.props;
        return (
            <div className="userInfoContainer">
                <div className="userInfoTitle">
                    {title}
                    {editable ? <FontAwesomeIcon icon={faEdit} className='userDetailsEditIcon' title='edit' onClick={this.onEditClicked} /> : null}
                </div>
                {this.state.isEdit ? <UserInfoEditPanel content={content} onCancelClicked={this.onEditClicked} onSaveClicked={this.onSaveClicked} /> : <div className="userInfoContent"> {content}</div>}
            </div>
        );
    }

}

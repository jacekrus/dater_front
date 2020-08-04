import React, { Component } from 'react';

export default class UserInfoEditPanel extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
        }
    }

    onInputChange = (evt) => {
        this.setState({content : evt.target.value});
    }

    render() {
        return (
            <React.Fragment>
                <textarea maxLength="500" onChange={this.onInputChange}>{this.state.content}</textarea>
                <button className="userInfoButton userInfoSaveButton" onClick={() => this.props.onSaveClicked(this.state.content)}>Save</button>
                <button className="userInfoButton userInfoCancelButton" onClick={this.props.onCancelClicked}>Cancel</button>
            </React.Fragment>
        );
    }

}
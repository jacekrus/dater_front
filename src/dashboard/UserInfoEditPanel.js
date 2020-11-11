import React, { Component } from 'react';

export default class UserInfoEditPanel extends Component {
    
    constructor(props) {
        super(props)
        let content = this.props.content ? this.props.content : '';
        this.state = {
            content: content,
        }
    }

    onInputChange = (evt) => {
        this.setState({content : evt.target.value});
    }

    render() {
        return (
            <React.Fragment>
                <textarea maxLength="500" value={this.state.content} onChange={this.onInputChange} />
                <button className="userInfoButton userInfoSaveButton" onClick={() => this.props.onSaveClicked(this.state.content)}>Save</button>
                <button className="userInfoButton userInfoCancelButton" onClick={this.props.onCancelClicked}>Cancel</button>
            </React.Fragment>
        );
    }

}
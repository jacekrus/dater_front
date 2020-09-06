import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';

export default class CustomCheckBox extends Component {

    state = {
        isChecked: false,
    }

    onClick = () => {
        if(this.props.onCheck) {
            this.props.onCheck(!this.state.isChecked);
        }
        if(this.props.checked) return;
        if(!this.props.isParentManaged) {
            this.setState((state) => ({ isChecked: !state.isChecked}));
        }
    }

    render() {
        return (
            <div className="checkboxContainer" onClick={this.onClick}>
                <div className={"checkmark" + ((this.state.isChecked || (this.props.isParentManaged && this.props.checked)) ? " checked" : "")}></div>
                <div className={(this.state.isChecked || (this.props.isParentManaged && this.props.checked)) ? "check" : ""} />
                <div className="checkboxLabel">{this.props.label}</div>
            </div>
        );
    }

}
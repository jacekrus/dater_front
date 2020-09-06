import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomCheckBox from './CustomCheckBox';

export default class GenderPicker extends Component {

    state = {
        isMaleSelected: false,
        isFemaleSelected: false,
    }

    onMaleCheck = (isChecked) => {
        if (!this.state.isMaleSelected && isChecked) {
            this.setState({ isMaleSelected: isChecked, isFemaleSelected: false });
            this.props.isMale(true);
        }
    }

    onFemaleCheck = (isChecked) => {
        if (!this.state.isFemaleSelected && isChecked) {
            this.setState({ isFemaleSelected: isChecked, isMaleSelected: false });
            this.props.isMale(false);
        }
    }

    render() {
        return (
            <div className="genderPicker">
                <div className="genderOption" title={"Select gender: female"}>
                    <FontAwesomeIcon icon={faVenus} className="genderPickIcon" />
                    <CustomCheckBox onCheck={this.onFemaleCheck} isParentManaged checked={this.state.isFemaleSelected}/>
                </div>
                <div title={"Select gender: male"}>
                    <FontAwesomeIcon icon={faMars} className="genderPickIcon" />
                    <CustomCheckBox onCheck={this.onMaleCheck} isParentManaged checked={this.state.isMaleSelected}/>
                </div>
            </div>
        );
    }

}
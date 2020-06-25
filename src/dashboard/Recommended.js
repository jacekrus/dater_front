import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { NavLink } from 'react-router-dom';
import Views from './Views';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';

export default class Recommended extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommended: [],
            failed: false,
        }
    }

    componentDidMount() {
        axiosRequest.get('/users/recommended')
            .then((resp) => {
                this.setState({ recommended: resp.data })
            }).catch(() => { /* do nothing */ });
    }

    render() {
        return (
            <React.Fragment>
                <div className="recommendedText">You may also like...</div>
                <div className="recommendedGridContainer">
                    {this.state.recommended.map((each) =>
                        <NavLink key={each.id} to={Views.DASHBOARD.path + Views.USER_DETAILS.path + `/${each.id}`}>
                            <div title={each.username} className='recommendedItemContainer' onClick={() => this.props.onClick(each)}>
                                <img alt='img' className='recommendedItem' title={each.username} src={each.photos[1]} />
                            </div>
                        </NavLink>
                    )}
                </div>
            </React.Fragment>
        );
    }

}
Recommended.contextType = AppContext;

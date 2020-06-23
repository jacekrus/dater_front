import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';

export default class UserDetailsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayedUserId: '',
            user: {},
            isLoading: false,
            error: false,
        }
    }

    getUsernameFromLocation(location) {
        return location.substring(location.lastIndexOf('/') + 1);
    }

    componentDidMount() {
        let newDisplayedUserId = this.getUsernameFromLocation(this.props.location.pathname);
        this.setState({ isLoading: true, displayedUserId: newDisplayedUserId })
        this.requestUserData(newDisplayedUserId);
    }

    componentDidUpdate() {
        let newDisplayedUserId = this.getUsernameFromLocation(this.props.location.pathname);
        if (newDisplayedUserId !== this.state.displayedUserId) {
            this.setState({ isLoading: true, displayedUserId: newDisplayedUserId });
            this.requestUserData(newDisplayedUserId);
        }
    }

    requestUserData(userId) {
        axiosRequest.get("/users/details?id=" + userId)
            .then((resp) => {
                this.setState({ isLoading: false, user: resp.data })
            }).catch(() => {
                this.setState({ isLoading: false, error: true })
            });
    }

    render() {
        return (
            <div >
                <div>{this.state.user.username}</div>
            </div>
        );
    }

}
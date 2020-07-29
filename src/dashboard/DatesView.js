import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';
import UserTile from './UserTile';
import AppContext from '../AppContext';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default class DatesView extends Component {

    state = {
        dates: [],
        currentPage: 0,
        scrollTop: 0,
    }

    componentDidMount() {
        axiosRequest.get('/users/favorites?page=0&size=9').then((resp) => this.setState({ dates: resp.data })).catch(() => { /*do nothing */ });
    }

    handleAboutToReachBottom() {
        let currentDates = this.state.dates;
        if (currentDates.length > 0) {
            axiosRequest.get('/users/favorites?page=' + (this.state.currentPage + 1) + '&size=9').then((resp) => {
                let newDates = [...currentDates, ...resp.data];
                if (newDates.length > currentDates.length) {
                    this.setState(prevState => ({ dates: newDates, currentPage: prevState.currentPage + 1 }));
                }
            }).catch( /* do nothing */);
        }
    }

    onUpdate = (values) => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        if (scrollTop > this.state.scrollTop) {
            const offset = scrollHeight - clientHeight - scrollTop;
            if (offset < 1) this.handleAboutToReachBottom();
        }
        this.setState({ scrollTop: scrollTop });
    }

    render() {
        const actionsContainer = <div className="userTileActionsContainer">
            <FontAwesomeIcon icon={faEnvelope} className='userTileActionIcon' />
        </div>

        return (
            <Scrollbars autoHide style={{ width: '90%', height: '80%' }} className='customScrollbar' onUpdate={this.onUpdate}>
                <div className='userTiles'>
                    {this.state.dates.map(each => <UserTile key={each.id} user={each} onUserDetailsClicked={this.props.onUserDetailsClicked} menu={actionsContainer} />)}
                </div>
            </Scrollbars>
        );
    }

}
DatesView.contextType = AppContext;
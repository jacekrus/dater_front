import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';
import UserTile from './UserTile';
import AppContext from '../AppContext';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default class LikedByView extends Component {

    state = {
        dates: [],
        currentPage: 0,
    }

    componentDidMount() {
        axiosRequest.get('/users/likedby?page=0&size=9').then((resp) => this.setState({ dates: resp.data })).catch(() => { /*do nothing */ });
    }

/*     handleAboutToReachBottom = () => {
        let currentDates = this.state.dates;
        const currentUser = this.context.state.user;
        const requestData = {
            gender: currentUser.preference,
            preference: currentUser.gender,
        }
        axiosRequest.post('/users?page=1&size=20', requestData).then((resp) => this.setState({ dates: [...currentDates, resp.data ] })).catch(() => { });
    }

    onUpdate = (values) => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const pad = 100; 
        const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
        if (t > 1) this.handleAboutToReachBottom();   
    } */

    render() {
        const actionsContainer =  <div className="userTileActionsContainer">
                                    <FontAwesomeIcon icon={faHeart} className='userTileActionIcon' />
                                  </div>

        return (
            <Scrollbars autoHide style={{width: '90%', height: '80%'}} className='customScrollbar' onUpdate={this.onUpdate}>
                <div className='userTiles'>
                    {this.state.dates.map(each => <UserTile key={each.id} user={each} onUserDetailsClicked={this.props.onUserDetailsClicked} menu={actionsContainer}/>)}
                </div>
            </Scrollbars>
        );
    }

}
DatesView.contextType = AppContext;
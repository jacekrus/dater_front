import React, { Component } from 'react';
import axiosRequest from '../AxiosRequest';
import './MainLayoutStyles.css';
import { Scrollbars } from 'react-custom-scrollbars';
import UserTile from './UserTile';

export default class PaginatedTilesContainer extends Component {

    state = {
        elements: [],
        currentPage: 0,
        scrollTop: 0,
    }

    componentDidMount() {
        axiosRequest.get('/users/' + this.props.request + '?page=0&size=9').then((resp) => this.setState({ elements: resp.data })).catch(() => { /*do nothing */ });
    }

    handleAboutToReachBottom() {
        let currentElements = this.state.elements;
        if (currentElements.length > 0) {
            axiosRequest.get('/users/' + this.props.request + '?page=' + (this.state.currentPage + 1) + '&size=9').then((resp) => {
                let newElements = [...currentElements, ...resp.data];
                if (newElements.length > currentElements.length) {
                    this.setState(prevState => ({ elements: newElements, currentPage: prevState.currentPage + 1 }));
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
        return (
            <Scrollbars autoHide style={{ width: '90%', height: '80%' }} className='customScrollbar' onUpdate={this.onUpdate}>
                <div className='userTiles'>
                    {this.state.elements.map(each => <UserTile key={each.id} user={each} onUserDetailsClicked={this.props.onUserDetailsClicked} menu={this.props.actionsContainer} />)}
                </div>
            </Scrollbars>
        );
    }
}
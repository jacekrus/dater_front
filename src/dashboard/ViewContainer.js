import React, { Component } from 'react';
import './MainLayoutStyles.css';
import FindDateView from './FindDateView';
import Views from './Views';
import { Route, Switch } from 'react-router-dom';
import UserDetailsView from './UserDetailsView';
import DatesView from './DatesView';
import LikedByView from './LikedByView';
import FavoritesView from './FavoritesView';
import AppContext from '../AppContext';
import ChatView from './ChatView';
import HelloView from './HelloView';

export default class ViewContainer extends Component {

    state = {
        conversationId: null,
    }

    onSendMessageClicked = (id) => {
        setTimeout(() => this.setState({ conversationId: id }), 0)
    }

    onChatViewRendered = () => {
        this.setState({conversationId: null})
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="mainViewContainer">
                        <Switch>
                            <Route exact path={Views.DASHBOARD.path} render={() => <HelloView />}/>
                            <Route exact path={Views.DASHBOARD.path + Views.FIND_A_DATE.path} render={(props) => <FindDateView onUserDetailsClicked={this.props.onSelectedUserChanged} {...props} />} />
                            <Route exact path={Views.DASHBOARD.path + Views.EDIT_PROFILE.path} render={(props) => <UserDetailsView selectedUser={context.state.user} editable {...props} />} />
                            <Route exact path={Views.DASHBOARD.path + Views.DATES.path} render={(props) => <DatesView onMenuItemClicked={this.props.onMenuItemClicked}
                                onUserDetailsClicked={this.props.onSelectedUserChanged} onSendMessageClicked={this.onSendMessageClicked} {...props} />} />
                            <Route exact path={Views.DASHBOARD.path + Views.FAVORITES.path} render={(props) => <FavoritesView onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onSelectedUserChanged} {...props} />} />
                            <Route exact path={Views.DASHBOARD.path + Views.CHAT.path} render={(props) => <ChatView onMenuItemClicked={this.props.onMenuItemClicked}
                                conversationId={this.state.conversationId} {...props} onChatViewRendered={this.onChatViewRendered}/>} />
                            <Route exact path={Views.DASHBOARD.path + Views.LIKEYOU.path} render={(props) => <LikedByView onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onSelectedUserChanged} {...props} />} />
                            <Route exact path={Views.DASHBOARD.path + Views.USER_DETAILS.path + "/:id"} render={(props) => <UserDetailsView selectedUser={this.props.selectedUser} {...props} />} />
                        </Switch>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}
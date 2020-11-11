import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PhotoCount from './PhotoCount';
import { NavLink } from 'react-router-dom';
import Views from './Views';
import { BeatLoader } from 'react-spinners';

export default class FindDateView extends Component {

    state = {
        currentUser: 0,
        currentPhoto: 0,
        foundUsers: [],
        loading: true,
    }

    componentDidMount() {
        this.requestUsers();
    }

    requestUsers() {
        axiosRequest.get('/users/recommended')
            .then((resp) => {
                let users = resp.data.filter(usr => usr.id !== this.context.state.user.id)
                this.setState({ foundUsers: users, loading: false })
            })
            .catch(() => {/*do nothing */ });
    }

    onNextPhotoClicked = () => {
        let currPhoto = this.state.currentPhoto;
        currPhoto = currPhoto + 1;
        if (currPhoto >= this.state.foundUsers[this.state.currentUser].photos.length) {
            currPhoto = 0;
        }
        this.setState({ currentPhoto: currPhoto });
    }

    onPreviousPhotoClicked = () => {
        let currPhoto = this.state.currentPhoto;
        currPhoto = currPhoto - 1;
        if (currPhoto < 0) {
            currPhoto = this.state.foundUsers[this.state.currentUser].photos.length - 1;
        }
        this.setState({ currentPhoto: currPhoto });
    }

    onLikeClicked = () => {
        let likedUser = this.state.foundUsers[this.state.currentUser];
        axiosRequest.put("/users/like?id=" + likedUser.id)
            .then(resp => {
                if (resp.status === 201) {
                    this.context.setMessage("You have a new Date! You can now send a message to " + likedUser.username)
                }
            })
            .catch(/* do nothing */);
        let currUser = this.state.currentUser + 1;
        if (currUser >= this.state.foundUsers.length) {
            this.requestUsers();
            currUser = 0;
        }
        this.setState({ currentUser: currUser, currentPhoto: 0 });
    }

    onRejectClicked = () => {
        let currUser = this.state.currentUser + 1;
        if (currUser >= this.state.foundUsers.length) {
            this.requestUsers();
            currUser = 0;
        }
        this.setState({currentUser: currUser, currentPhoto: -1}, () => setTimeout(() => this.setState({currentPhoto: 0 }), 100))
    }

    getUsersBirthYear(brithDate) {
        return brithDate.substring(0, 4);
    }

    render() {
        let displayedUser = this.state.foundUsers[this.state.currentUser];
        let photoCount = displayedUser ? displayedUser.photos.length : 0;
        let age = displayedUser ? new Date().getFullYear() - this.getUsersBirthYear(displayedUser.dateOfBirth) : 0;
        return (
            <div className='findDateContainer'>
                {this.state.loading ? <BeatLoader loading /> :
                    <React.Fragment>
                        <div className='findDateContent'>
                            {displayedUser ?
                                <React.Fragment>
                                    {photoCount < 2 ? null :
                                        <React.Fragment>
                                            <div className='switchPhotoPanel' onClick={this.onPreviousPhotoClicked} />
                                            <div className='switchPhotoPanel switchPhotoPanelRight' onClick={this.onNextPhotoClicked} />
                                            <FontAwesomeIcon icon={faChevronLeft} className='buttonChangePhoto buttonPreviousPhoto' onClick={this.onPreviousPhotoClicked} />
                                            <FontAwesomeIcon icon={faChevronRight} className='buttonChangePhoto buttonNextPhoto' onClick={this.onNextPhotoClicked} />
                                        </React.Fragment>
                                    }
                                    {photoCount > 0 ?
                                        <div className="userPhotoSlideContainer">
                                            {displayedUser.photos.map((each, index) => <img alt="img" key={index}
                                                className={"userPhotoSlide" + (this.state.currentPhoto === index ? "" : " userPhotoSlideHidden")} src={each} />)}
                                            <PhotoCount currentPhoto={this.state.currentPhoto + 1} photoCount={photoCount} />
                                        </div> : null
                                    }
                                </React.Fragment> : null
                            }
                            <div className='actionButton actionButtonLike' onClick={this.onLikeClicked}>
                                <FontAwesomeIcon icon={faHeart} className='actionButtonIcon actionButtonLike' />
                            </div>
                            <div className='actionButton actionButtonReject' onClick={this.onRejectClicked}>
                                <FontAwesomeIcon icon={faTimes} className='actionButtonIcon actionButtonReject iconReject' />
                            </div>
                        </div>
                        <div className='findDateDescription'>
                            {displayedUser ?
                                <React.Fragment>
                                    <NavLink to={Views.DASHBOARD.path + Views.USER_DETAILS.path + `/${displayedUser.id}`} className='userDetailsLink'>
                                        <div className='displayedUsername' title={displayedUser.username} onClick={() => this.props.onUserDetailsClicked(displayedUser)}>
                                            {displayedUser.username}
                                        </div>
                                        <div className="displayedUserAge" title={age}>
                                            , {age}
                                        </div>
                                    </NavLink>
                                    <div className='displayedUserDescription'>{displayedUser.description}</div>
                                </React.Fragment> : null}
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }

}
FindDateView.contextType = AppContext;
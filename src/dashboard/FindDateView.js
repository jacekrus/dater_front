import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PhotoCount from './PhotoCount';

export default class FindDateView extends Component {

    state = {
        currentUser: 5,
        currentPhoto: 0,
        foundUsers: [],
        loading: true,
    }

    componentDidMount() {
        axiosRequest.get('/users')
            .then((resp) => this.setState({ foundUsers: resp.data, loading: false }))
            .catch(() => {
                this.context.setError(true);
                this.context.setMessage("Something went wrong, please try again later.")
            });
    }

    onNextPhotoClicked = () => {
        let currPhoto = this.state.currentPhoto;
        currPhoto = currPhoto + 1;
        if(currPhoto >= this.state.foundUsers[this.state.currentUser].photos.length) {
            currPhoto = 0;
        }
        this.setState({currentPhoto: currPhoto});
    }

    onPreviousPhotoClicked = () => {
        let currPhoto = this.state.currentPhoto;
        currPhoto = currPhoto - 1;
        if(currPhoto < 0) {
            currPhoto = this.state.foundUsers[this.state.currentUser].photos.length - 1;
        }
        this.setState({currentPhoto: currPhoto});
    }

    onLikeClicked = () => {
        let currUser = this.state.currentUser + 1;
        if(currUser >= this.state.foundUsers.length) {
            currUser = 0;
        }
        this.setState({currentUser: currUser}); 
    }

    onRejectClicked = () => {
        let currUser = this.state.currentUser + 1;
        if(currUser >= this.state.foundUsers.length) {
            currUser = 0;
        } 
        this.setState({currentUser: currUser});
    }

    getUsersBirthYear(brithDate) {
        return brithDate.substring(0,4);
    }

    render() {
        let displayedUser = this.state.foundUsers[this.state.currentUser];
        let photoCount = displayedUser ? displayedUser.photos.length : 0;
        return (
            <div className='findDateContainer'>
                {this.state.loading ? <div>LOADING...</div> :
                    <React.Fragment>
                        <div className='findDateContent'>
                            {displayedUser ?
                                <React.Fragment>
                                    {photoCount < 2 ? null :
                                        <React.Fragment>
                                            <div className='switchPhotoPanel' onClick={this.onPreviousPhotoClicked}/>
                                            <div className='switchPhotoPanel switchPhotoPanelRight' onClick={this.onNextPhotoClicked} />
                                            <FontAwesomeIcon icon={faChevronLeft} className='buttonChangePhoto buttonPreviousPhoto' onClick={this.onPreviousPhotoClicked} />
                                            <FontAwesomeIcon icon={faChevronRight} className='buttonChangePhoto buttonNextPhoto' onClick={this.onNextPhotoClicked} />
                                        </React.Fragment>
                                    }
                                    {photoCount > 0 ?
                                        <React.Fragment>
                                            {displayedUser.photos.map((each, index) => <img alt="img" key={index} className={"userPhotoSlide" + (this.state.currentPhoto === index ? "" : " userPhotoSlideHidden")} src={each} />)}
                                            <PhotoCount currentPhoto={this.state.currentPhoto + 1} photoCount={photoCount} />
                                        </React.Fragment> : null
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
                                    <div className='displayedUsername' title={displayedUser.username}>{displayedUser.username}, <span style={{fontSize: '35px'}}>{new Date().getFullYear() - this.getUsersBirthYear(displayedUser.dateOfBirth)}</span></div>
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
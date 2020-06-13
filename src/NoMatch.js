import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import Views from './dashboard/Views';

const NoMatch = () => {
    return(
        <React.Fragment>
            <img className="image404" alt="404" src="/images/404image.jpg"/>
            <div className="text404">Seems you got lost...
                <NavLink to={Views.DASHBOARD.path} style={{ textDecoration: 'none' }}>
                    <span style={{color: 'green'}}>  Go back</span>
                </NavLink>
            </div>
        </React.Fragment>
    );
}
export default NoMatch;

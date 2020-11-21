import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { clear } from 'redux-localstorage-simple';
import "../css/Login.css";

export default function LogoutButton(props) {
    const { user } = props;
    return (
        <div>
            <p className="login-info">
                Logged in as {user.id ? ` ${user.id}` : ''}
            </p>
            <a href={`http://finetune.io/spotify/logout`} onClick={() => clear()}>
                <Button className="logout-button" outline onClick={() => clear()}>
                    <img className="spotify-logo" src="/img/spotify-logo.png" alt="spotify-logo.JPG" />
                    Logout
                </Button>
            </a>
        </div>
    );
}

LogoutButton.propTypes = {
  user: PropTypes.shape({}).isRequired,
};
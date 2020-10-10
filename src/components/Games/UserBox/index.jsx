import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { logout } from '../../../core/actions/authActions';
import { URL_LOGIN } from '../../../core/Routes/Constants';

const UserBox = ({ dispatchLogout, auth }) => {
    const { player } = useSelector(state => state.auth); // get player object from redux => auth
    const { username } = auth;

    return (
        <>
            <div className="ui list">
                <div className="player item">
                    <img className="ui avatar image" src={player.avatar} alt="avatar" />
                    <div className="content">
                        <div className="header">
                            <b className="name">{player.name}</b>
                        </div>
                        <div className="description event">{player.event}</div>
                    </div>
                </div>
            </div>
            <Link
                to={URL_LOGIN}
                type="button"
                onClick={() => dispatchLogout(username)}
                className="logout ui left floated secondary button inverted"
            >
                <i className="left chevron icon" />
                Log Out
            </Link>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLogout: username => dispatch(logout(username)),
});

const mapStateToProps = state => ({
    auth: state.auth,
});

UserBox.propTypes = {
    auth: PropTypes.object,
    dispatchLogout: PropTypes.func,
};

UserBox.defaultProps = {
    auth: {},
    dispatchLogout: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);

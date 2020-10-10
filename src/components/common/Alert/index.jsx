import React from 'react';
import PropTypes from 'prop-types';
import './Style.scss';

const Alert = ({ type, message }) => {
    return (
        <div className="alert-container">
            <div className={`alert ${type}`}>
                {type === 'success' && <i className="checkmark icon" />}
                {type === 'error' && <i className="warning icon" />}
                {type === 'warning' && <i className="warning icon" />}
                {message}
            </div>
        </div>
    );
};

Alert.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
};

Alert.defaultProps = {
    type: 'error',
    message: 'Unexpected error occurred, plase try again',
};

export default Alert;

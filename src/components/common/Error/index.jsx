import React from 'react';
import PropTypes from 'prop-types';
import './Style.scss';

const Error = ({ statusCode, message, subtitle }) => {
    return (
        <div className="error">
            <div className="error-box">
                <div className="error-title mb-3">Error - {statusCode}</div>
                {message && <div className="error-message mb-2">{message}</div>}
                {subtitle && <div className="error-subtitle">{subtitle}</div>}
            </div>
        </div>
    );
};

Error.propTypes = {
    statusCode: PropTypes.number,
    message: PropTypes.string,
    subtitle: PropTypes.string,
};

Error.defaultProps = {
    statusCode: 500,
    message: null,
    subtitle: null,
};

export default Error;

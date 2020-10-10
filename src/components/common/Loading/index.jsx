import React from 'react';
import PropTypes from 'prop-types';
import './Style.scss';

const Loading = ({ size }) => {
    return (
        <div className={`loading size-${size}`}>
            <div className="loader" />
        </div>
    );
};

Loading.propTypes = {
    size: PropTypes.string,
};

Loading.defaultProps = {
    size: 'small',
};

export default Loading;

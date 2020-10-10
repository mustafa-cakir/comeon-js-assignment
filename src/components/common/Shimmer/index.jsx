import React from 'react';
import PropTypes from 'prop-types';
import './Style.scss';

const Shimmer = ({ loop, children }) => {
    return (
        <div className="shimmer">
            {Array.from(Array(loop).keys()).map(row => (
                <div key={row} className="shimmer-row">
                    {children}
                </div>
            ))}
        </div>
    );
};

Shimmer.propTypes = {
    loop: PropTypes.number,
};

Shimmer.defaultProps = {
    loop: 1,
};

export default Shimmer;

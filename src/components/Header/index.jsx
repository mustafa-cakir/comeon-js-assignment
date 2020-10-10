import React from 'react';
import logo from '../../assets/images/logo.svg';

const Heder = () => {
    return (
        <div className="ui one column center aligned page grid">
            <div className="column twelve wide">
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
};

export default Heder;

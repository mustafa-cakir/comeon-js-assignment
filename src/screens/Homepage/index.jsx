import React from 'react';
import { Redirect } from 'react-router-dom';
import { URL_GAMES } from '../../core/Routes/Constants';

const Homepage = () => {
    return <Redirect to={URL_GAMES} />;
};

export default Homepage;

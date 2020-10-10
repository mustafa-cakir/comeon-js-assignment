import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { URL_GAMES } from '../../core/Routes/Constants';

const InGame = () => {
    const params = useParams();
    const history = useHistory();
    const { code } = params;
    if (!code) history.push(URL_GAMES); // if {code} is not provided in the URL (/ingame/:code) then redirect to games page

    useEffect(() => {
        if (window.comeon) {
            window.comeon.game.launch(code);
        }
    }, [code]);

    return (
        <div className="ingame">
            <div className="ui grid centered">
                <div className="three wide column">
                    <Link to={URL_GAMES} className="ui right floated secondary button inverted">
                        <i className="left chevron icon" />
                        Back
                    </Link>
                </div>
                <div className="ten wide column">
                    <div id="game-launch" />
                </div>
                <div className="three wide column" />
            </div>
        </div>
    );
};

export default InGame;

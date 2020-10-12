import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useGamesState } from '../../../screens/Games/StateContext';
import Alert from '../../common/Alert';
import { API_GAMES } from '../../../core/Routes/Apis';
import Shimmer from '../../common/Shimmer';
import { URL_IN_GAME } from '../../../core/Routes/Constants';
import { qsParser } from '../../../core/Utils';

const GamesList = () => {
    const [state, dispatch] = useGamesState();
    const { gamesData, gamesError, isGamesLoading, filterByCatId } = state;

    const location = useLocation();
    const query = qsParser(location);

    const { q: keyword } = query;

    useEffect(() => {
        dispatch({ type: 'START_GET_GAMES' });
        axios
            .get(API_GAMES)
            .then(res => {
                setTimeout(() => {
                    // delay applied to simulate the real server behaviour
                    dispatch({ type: 'FINISH_GET_GAMES', payload: res.data });
                }, 2000);
            })
            .catch(err => {
                const { error } = err.response.data || {};
                dispatch({ type: 'ERROR_GET_GAMES', payload: error });
            });
    }, [dispatch]);

    let displayedGames = 0;

    return (
        <>
            {isGamesLoading && (
                <Shimmer loop={5}>
                    <div className="ui grid centered">
                        <div className="four wide column">
                            <div className="shimmer-line" style={{ width: '150px', height: '150px' }} />
                        </div>
                        <div className="twelve wide column">
                            <div
                                className="shimmer-line"
                                style={{ width: '20%', height: '20px', marginBottom: '15px' }}
                            />
                            <div className="shimmer-line" style={{ width: '75%', height: '10px' }} />
                            <div className="shimmer-line" style={{ width: '75%', height: '10px' }} />
                            <div className="shimmer-line" style={{ width: '50%', height: '10px' }} />
                            <div className="shimmer-line" style={{ width: '50%', height: '10px' }} />
                        </div>
                        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                            <div className="shimmer-line" style={{ width: '100%', height: '2px' }} />
                        </div>
                    </div>
                </Shimmer>
            )}
            {gamesError && <Alert type="error" message={gamesError} />}
            {gamesData &&
                gamesData.map(game => {
                    const { categoryIds = [], name, description, code, icon } = game;
                    if (categoryIds.indexOf(filterByCatId) < 0) return false;
                    if (
                        keyword &&
                        description.toLocaleLowerCase().search(keyword) < 0 &&
                        name.toLocaleLowerCase().search(keyword) < 0
                    )
                        return false;
                    displayedGames += 1;
                    return (
                        <div key={game.code} className="game item">
                            <div className="ui small image">
                                <img src={icon} alt="game-icon" />
                            </div>
                            <div className="content">
                                <div className="header">
                                    <b className="name">{name}</b>
                                </div>
                                <div className="description">{description}</div>
                                <div className="extra">
                                    <Link
                                        to={`${URL_IN_GAME}/${code}`}
                                        className="play ui right floated secondary button inverted"
                                    >
                                        Play
                                        <i className="right chevron icon" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            {displayedGames === 0 && (
                <div>
                    Nothing found for <strong>{keyword}</strong>.
                </div>
            )}
        </>
    );
};

export default GamesList;

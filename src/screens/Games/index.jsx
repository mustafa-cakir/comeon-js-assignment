import React from 'react';
import GamesList from '../../components/Games/GamesList';
import { GamesStateProvider } from './StateContext';
import UserBox from '../../components/Games/UserBox';
import SearchBox from '../../components/Games/SearchBox';
import Categories from '../../components/Games/Categories';

const Games = () => {
    return (
        <GamesStateProvider>
            <div className="casino">
                <div className="ui grid centered">
                    <div className="twelve wide column">
                        <UserBox />
                    </div>
                    <div className="four wide column">
                        <SearchBox />
                    </div>
                </div>
                <div className="ui grid">
                    <div className="twelve wide column">
                        <h3 className="ui dividing header">Games</h3>
                        <div className="ui relaxed divided game items links">
                            <GamesList />
                        </div>
                    </div>
                    <div className="four wide column">
                        <h3 className="ui dividing header">Categories</h3>
                        <div className="ui selection animated list category items">
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </GamesStateProvider>
    );
};

export default Games;

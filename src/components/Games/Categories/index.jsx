import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { useGamesState } from '../../../screens/Games/StateContext';
import Alert from '../../common/Alert';
import { API_CATEGORIES } from '../../../core/Routes/Apis';
import Shimmer from '../../common/Shimmer';
import { qsParser, qsStringifier } from '../../../core/Utils';

const Categories = () => {
    const [state, dispatch] = useGamesState();
    const { categoriesData, categoriesError, isCategoriesLoading, filterByCatId } = state;
    const history = useHistory();
    const location = useLocation();
    const query = qsParser(location);

    useEffect(() => {
        dispatch({ type: 'START_GET_CATEGORIES' });
        axios
            .get(API_CATEGORIES)
            .then(res => {
                setTimeout(() => {
                    // delay applied to simulate the real server behaviour
                    dispatch({ type: 'FINISH_GET_CATEGORIES', payload: res.data });
                }, 1500);
            })
            .catch(err => {
                const { error } = err.response.data || {};
                dispatch({ type: 'ERROR_GET_CATEGORIES', payload: error });
            });
    }, [dispatch]);

    const applyCategoryFiltering = id => {
        dispatch({ type: 'SET_FILTER_BY_CAT_ID', payload: id });

        // reset search once category filter is changed
        history.replace({
            search: qsStringifier(query, { q: undefined }),
        });
    };

    return (
        <>
            {isCategoriesLoading && (
                <Shimmer>
                    <div className="shimmer-line" style={{ width: '75%', height: '10px', marginBottom: '15px' }} />
                    <div className="shimmer-line" style={{ width: '75%', height: '10px', marginBottom: '15px' }} />
                    <div className="shimmer-line" style={{ width: '50%', height: '10px', marginBottom: '15px' }} />
                    <div className="shimmer-line" style={{ width: '50%', height: '10px', marginBottom: '15px' }} />
                </Shimmer>
            )}
            {categoriesError && <Alert type="error" message={categoriesError} />}
            {categoriesData &&
                categoriesData.length > 0 &&
                categoriesData.map(category => (
                    <button
                        type="button"
                        key={category.id}
                        className={`category item ${filterByCatId === category.id ? 'active' : ''}`}
                        onClick={() => applyCategoryFiltering(category.id)}
                    >
                        <div className="content">
                            <div className="header">{category.name}</div>
                        </div>
                    </button>
                ))}
        </>
    );
};

export default Categories;

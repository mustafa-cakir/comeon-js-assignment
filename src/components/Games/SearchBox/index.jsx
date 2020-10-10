import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce, qsParser, qsStringifier } from '../../../core/Utils';

const SearchBox = () => {
    const history = useHistory();
    const location = useLocation();
    const query = qsParser(location);
    const searchInputEl = useRef(null);

    const { q: keyword } = query;

    const searchReset = () => {
        history.replace({
            search: qsStringifier(query, { q: undefined }),
        });
    };

    useEffect(() => {
        if (searchInputEl && searchInputEl.current) {
            searchInputEl.current.value = keyword || '';
        }
    }, [keyword]);

    const handleInputChange = () => {
        if (!searchInputEl || !searchInputEl.current) return false;
        const { value } = searchInputEl.current;
        if (value.length === 0) searchReset();
        if (value.length < 3) return false; // don't do anything if char is less than 3
        history.replace({
            search: qsStringifier(query, { q: value.toLocaleLowerCase() }),
        });
        return false;
    };

    return (
        <div className="search ui small icon input ">
            <input
                ref={searchInputEl}
                onChange={debounce(handleInputChange, 500)}
                type="text"
                defaultValue={keyword}
                placeholder="Search InGame"
            />
            {keyword ? (
                <i role="button" tabIndex={1} className="close icon" onClick={searchReset} onKeyPress={searchReset} />
            ) : (
                <i className="search icon" />
            )}
        </div>
    );
};

export default SearchBox;

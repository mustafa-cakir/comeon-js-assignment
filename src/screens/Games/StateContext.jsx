import React from 'react';
// import update from 'immutability-helper';
// import update from 'immutability-helper';

const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'START_GET_CATEGORIES':
            return {
                ...state,
                isCategoriesLoading: true,
                categoriesError: null,
            };
        case 'FINISH_GET_CATEGORIES':
            return {
                ...state,
                isCategoriesLoading: false,
                categoriesData: action.payload,
            };
        case 'ERROR_GET_CATEGORIES':
            return {
                ...state,
                isCategoriesLoading: false,
                categoriesError: action.payload,
            };

        case 'START_GET_GAMES':
            return {
                ...state,
                isGamesLoading: true,
                gamesError: null,
            };
        case 'FINISH_GET_GAMES':
            return {
                ...state,
                isGamesLoading: false,
                gamesData: action.payload,
            };
        case 'ERROR_GET_GAMES':
            return {
                ...state,
                isGamesLoading: false,
                gamesError: action.payload,
            };

        case 'SET_FILTER_BY_CAT_ID':
            return {
                ...state,
                filterByCatId: action.payload,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const initialState = {
    // games related states
    gamesData: null,
    gamesError: null,
    isGamesLoading: true,
    // categories related states
    categoriesData: null,
    categoriesError: null,
    isCategoriesLoading: true,
    // filtering ids
    filterByCatId: 0,
};

const GamesStateContext = React.createContext(initialState);

export const GamesStateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(paymentReducer, initialState);
    const value = [state, dispatch];
    return <GamesStateContext.Provider value={value}>{children}</GamesStateContext.Provider>;
};

export const useGamesState = () => {
    const context = React.useContext(GamesStateContext);
    if (!context) {
        throw new Error('useGamesState must be used within the GamesStateProvider');
    }
    return context;
};

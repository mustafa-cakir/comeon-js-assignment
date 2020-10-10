import { LOGOUT, SET_AUTH } from '../Constants';

const initialState = {
    isAuthenticated: false,
    token: null,
    username: null,
    player: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: true,
                ...action.payload,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;

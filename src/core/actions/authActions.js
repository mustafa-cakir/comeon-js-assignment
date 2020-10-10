import axios from 'axios';
import { LOGOUT, SET_AUTH } from '../Constants';
import { deleteAuthData, retrieveAuthData, storeAuthData } from '../Utils';
import { API_LOGOUT } from '../Routes/Apis';

const setLogout = () => ({
    type: LOGOUT,
});

const setAuth = data => ({
    type: SET_AUTH,
    payload: data,
});

export const logout = username => {
    return dispatch => {
        deleteAuthData();
        dispatch(setLogout());
        if (username) {
            axios
                .post(API_LOGOUT, {
                    username,
                })
                .then(() => {
                    // do nothing.
                })
                .catch(() => {
                    // something seriously went wrong, log this error case
                });
        }
    };
};

export const login = data => {
    storeAuthData(data);
    if (data) axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    return dispatch => {
        dispatch(setAuth(data));
    };
};

export const checkAuth = () => {
    const data = retrieveAuthData();
    if (data) {
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`; // add JWT token to axios headers
        // in here.. (if JWT is used for token handling) check the tokenExpiration by accessing it through data.tokenExpiration date,
        // in case token is expired, don't handle the login, instead; init the refrehToken request (or redirect user to login page)
        return dispatch => {
            dispatch(setAuth(data));
        };
    }
    return dispatch => {
        dispatch(logout());
    };
};

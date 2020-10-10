import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { URL_LOGIN } from './Routes/Constants';
import ErrorBoundary from './ErrorBoundary';

const PrivateRoute = ({ Component, key, path, auth }) => (
    <Route
        key={key}
        exact
        path={path}
        render={props =>
            auth.isAuthenticated ? (
                <ErrorBoundary>
                    <Component />
                </ErrorBoundary>
            ) : (
                <Redirect
                    to={{
                        pathname: URL_LOGIN,
                        state: { returnUrl: props.location.pathname },
                    }}
                />
            )
        }
    />
);

PrivateRoute.propTypes = {
    Component: PropTypes.object,
    key: PropTypes.string,
    path: PropTypes.string,
    auth: PropTypes.object,
};

PrivateRoute.defaultProps = {
    Component: () => {},
    key: null,
    path: null,
    auth: {},
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

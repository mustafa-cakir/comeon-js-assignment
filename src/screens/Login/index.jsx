import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import ValidateRequiredInputs from '../../core/Utils/validations';
import { API_LOGIN } from '../../core/Routes/Apis';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import { login } from '../../core/actions/authActions';
import { URL_HOMEPAGE } from '../../core/Routes/Constants';
import Loading from '../../components/common/Loading';
import './Style.scss';

const Login = ({ auth, dispatchLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const history = useHistory();

    const { isAuthenticated } = auth;

    useEffect(() => {
        const returnUrl = location && location.state ? location.state.returnUrl : null;
        if (isAuthenticated) {
            // Redirect users to returnUrl (if exist) or to homepage
            // when user successfully logged or they navigate to this page even if they are already logged in
            history.replace({
                pathname: returnUrl || URL_HOMEPAGE,
            });
        }
    }, [history, location, isAuthenticated]);

    const loginFormSubmitHandler = event => {
        event.preventDefault(); // prevent defeault form-submit-behaviour
        if (ValidateRequiredInputs(event.target)) return false; // validate required fields, if validation false, stop executing

        const formData = new FormData(event.target); // construct formData
        const username = formData.get('username'); // get input values from formData object
        const password = formData.get('password'); // get input values from formData object

        setIsLoading(true); // set loading to true
        setError(null); // set error to null in case user re-submit the form after a failed submission
        axios
            .post(API_LOGIN, {
                username,
                password,
            })
            .then(res => {
                setTimeout(() => {
                    // delay applied to simulate the real server behaviour
                    setIsLoading(false);
                    const { player = {} } = res.data || {};
                    dispatchLogin({
                        username,
                        player,
                    }); // handle login
                }, 1000);
            })
            .catch(err => {
                const { error: errorMessage } = err.response.data || {};
                setIsLoading(false);
                setError(errorMessage);
            });

        return true;
    };

    return (
        <div className="login">
            {error && <Alert type="error" message={error} />}
            {isLoading && <Loading size="fill" />}
            <div className="ui grid centered">
                <form onSubmit={loginFormSubmitHandler} noValidate>
                    <div className="fields">
                        <div className="required field">
                            <Input
                                name="username"
                                defaultValue="eric"
                                placeholder="Username"
                                required
                                type="text"
                                icon="user"
                            />
                        </div>
                        <div className="required field">
                            <Input
                                name="password"
                                defaultValue="dad"
                                placeholder="Password"
                                required
                                type="password"
                                icon="lock"
                            />
                        </div>
                        <div className="field">
                            <Input name="password" defaultValue="Login" type="submit" icon="right chevron" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLogin: data => dispatch(login(data)),
});

const mapStateToProps = state => ({
    auth: state.auth,
});

Login.propTypes = {
    auth: PropTypes.object,
    dispatchLogin: PropTypes.func,
};

Login.defaultProps = {
    auth: {},
    dispatchLogin: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

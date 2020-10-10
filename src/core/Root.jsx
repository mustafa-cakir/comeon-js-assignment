import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ErrorBoundary from './ErrorBoundary';
import Error from '../components/common/Error';
import Loading from '../components/common/Loading';
import routes from './Routes';
import PrivateRoute from './PrivateRoute';

const Root = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <main className="main container">
                    <Suspense fallback={<Loading size="lazyload" />}>
                        <Switch>
                            {routes.map(({ path, Component, isAuth = true }) => {
                                if (isAuth) return <PrivateRoute exact Component={Component} key={path} path={path} />;
                                return (
                                    <Route
                                        key={path}
                                        exact
                                        path={path}
                                        render={() => (
                                            <ErrorBoundary>
                                                <Component />
                                            </ErrorBoundary>
                                        )}
                                    />
                                );
                            })}
                            <Route
                                render={() => (
                                    <Error statusCode={404} message="Page Not Found." subtitle="That's all we know" />
                                )}
                            />
                        </Switch>
                    </Suspense>
                </main>
            </BrowserRouter>
        </div>
    );
};

export default Root;

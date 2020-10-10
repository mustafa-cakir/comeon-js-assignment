import { lazy } from 'react';
import { URL_IN_GAME, URL_GAMES, URL_HOMEPAGE, URL_LOGIN } from './Constants';

const Login = lazy(() => import('../../screens/Login'));
const Homepage = lazy(() => import('../../screens/Homepage'));
const Games = lazy(() => import('../../screens/Games'));
const InGame = lazy(() => import('../../screens/InGame'));

const routes = [
    {
        path: URL_LOGIN,
        Component: Login,
        isAuth: false,
    },
    {
        path: URL_HOMEPAGE,
        Component: Homepage,
        isAuth: true,
    },
    {
        path: URL_GAMES,
        Component: Games,
        isAuth: true,
    },
    {
        path: `${URL_IN_GAME}/:code`,
        Component: InGame,
        isAuth: true,
    },
];

export default routes;

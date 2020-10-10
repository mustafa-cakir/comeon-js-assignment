import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { checkAuth } from '../actions/authActions';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(checkAuth());

export default store;

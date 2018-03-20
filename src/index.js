import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import SocialTriviaApp from './components/SocialTriviaApp';
import teams from './reducers/teams';
import timer from './reducers/timer';

const rootReducer = combineReducers({
    teams,
    timer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger)
);

render(
    <Provider store={store}>
        <SocialTriviaApp />
    </Provider>, 
    document.getElementById('root')
);
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import SocialTriviaApp from './components/SocialTriviaApp';
import answers from './reducers/answers';
import timer from './reducers/timer';

const store = createStore(
    answers,
    timer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger)
);

render(
    <Provider store={store}>
        <SocialTriviaApp />
    </Provider>, 
    document.getElementById('root')
);
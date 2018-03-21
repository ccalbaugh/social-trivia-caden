import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SocialTriviaApp from './components/SocialTriviaApp';
import HostBar from './components/HostBar/hostBar';
import Teams from './components/Teams/teams';
import teams from './reducers/teams';
import timer from './reducers/timer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    teams,
    timer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger, thunk)
);

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={<p>"Please Login"</p>} />
                <Route path="/host" component={HostBar} />                
                <Route path="/teams" component={Teams} />
                <Route path="/" component={SocialTriviaApp} />
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
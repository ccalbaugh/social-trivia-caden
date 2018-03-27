import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HostBar from './components/HostBar/hostBar';
import Teams from './components/Teams/teams';
import Team from './components/Team/team';
import CreateTeam from './components/CreateTeam/createTeam';
import teams, { isShowingAnswers } from './reducers/teams';
import timer from './reducers/timer';
import thunk from 'redux-thunk'
import './styles.css';

const rootReducer = combineReducers({
    isShowingAnswers,
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
                <Route exact path="/" component={CreateTeam} />
                <Route exact path="/admin" component={HostBar} />       
                <Route path="/team/:id" component={Team} />                
                <Route exact path="/teams" component={Teams} />
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
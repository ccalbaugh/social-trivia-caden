import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './timer';
import * as types from './actionTypes';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let store

beforeEach(() => {
    store = mockStore({})
})

afterEach(() => {
    store.clearActions()
})

it('creates an action to create the timer', () => {

    const expectedAction = { type: types.CREATE_TIMER, isTimerRunning: false };

    expect(actions.createTimer()).to.equal(expectedAction)

});

it('creates an action to control the timer', () => {

    const mockIsTimerRunning = true;

    const expectedAction = { type: types.CONTROL_TIMER, isTimerRunning: mockIsTimerRunning };

    expect(actions.controlTimer(mockIsTimerRunning)).to.equal(expectedAction)

});

it('creates an action to reset the timer', () => {

    const mockDefaultTime = 10;

    const expectedAction = { type: types.RESET_TIMER, currentTime: mockDefaultTime };

    expect(actions.resetTimer(mockDefaultTime)).to.equal(expectedAction)    

});

it('creates an action to update the timer', () => {

    const mockSetTime = 10;

    const expectedAction = { type: types.UPDATE_TIMER, setTime: mockSetTime };

    expect(actions.updateTimer(mockSetTime)).to.equal(expectedAction)    
        
});

it('creates an action to decrement the timer', () => {

    const mockTimeLeft = 10;

    const expectedAction = { type: types.DECREMENT_TIMER, timeLeft: mockTimeLeft };

    expect(actions.decrementTimer(mockTimeLeft)).to.equal(expectedAction)    
        
});
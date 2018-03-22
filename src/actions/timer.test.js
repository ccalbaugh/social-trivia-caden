import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './timer';
import * as types from './actionTypes';

it('creates an action to create the timer', () => {

    const expectedAction = { type: types.CREATE_TIMER, isTimerRunning: false, defaultTime: 60, currentTime: 60 };

    expect(actions.createTimer()).to.equal(expectedAction);

});

it('creates an action to control the timer', () => {

    const mockIsTimerRunning = true;

    const expectedAction = { type: types.CONTROL_TIMER, isTimerRunning: mockIsTimerRunning };

    expect(actions.controlTimer(mockIsTimerRunning)).to.equal(expectedAction);

});

it('creates an action to reset the timer', () => {

    const mockDefaultTime = 10;

    const expectedAction = { type: types.RESET_TIMER, defaultTime: mockDefaultTime };

    expect(actions.resetTimer(mockDefaultTime)).to.equal(expectedAction);

});

it('creates an action to update the timer', () => {

    const mockSetTime = 10;

    const expectedAction = { type: types.UPDATE_TIMER, setTime: mockSetTime };

    expect(actions.updateTimer(mockSetTime)).to.equal(expectedAction);

});

it('creates an action to decrement the timer', () => {

    const mockTimeLeft = 10;

    const expectedAction = { type: types.DECREMENT_TIMER, timeLeft: mockTimeLeft };

    expect(actions.decrementTimer(mockTimeLeft)).to.equal(expectedAction);

});
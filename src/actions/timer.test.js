import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './timer';
import * as types from './actionTypes';

it('creates an action to update the timer', () => {

    const mockSetTime = 10;

    const expectedAction = { type: types.UPDATE_TIMER, setTime: mockSetTime };

    expect(actions.updateTimer(mockSetTime)).to.equal(expectedAction);

});

it('creates an action to start the timer', () => {

    const mockIsTimerStarted = true;

    const expectedAction = { type: types.START_TIMER, isTimerStarted: mockIsTimerStarted };

    expect(actions.startTimer(mockIsTimerStarted)).to.equal(expectedAction);

});

it('creates an action to reset the timer', () => {

    const mockSetTime = 10;

    const expectedAction = { type: types.RESET_TIMER, setTime: mockSetTime };

    expect(actions.resetTimer(mockSetTime)).to.equal(expectedAction);

});

it('creates an action to decrement the timer', () => {

    const mockTimeLeft = 10;

    const expectedAction = { type: types.DECREMENT_TIMER, timeLeft: mockTimeLeft };

    expect(actions.decrementTimer(mockTimeLeft)).to.equal(expectedAction);

});
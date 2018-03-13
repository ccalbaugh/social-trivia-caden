import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './actions';
import * as types from './actionTypes';

it('creates an action to submit an answer', () => {

    const mockAnswer = 10;

    const expectedAction = { type: types.SUBMIT_ANSWER, answer: mockAnswer };

    expect(actions.submitAnswer(mockAnswer)).to.equal(expectedAction);

});

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
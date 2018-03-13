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

it('creates an action to start the timer', () => {

    const mockIsTimerStarted = true;

    const expectedAction = { type: types.START_TIMER, isTimerStarted: mockIsTimerStarted };

    expect(actions.startTimer(mockIsTimerStarted)).to.equal(expectedAction);

});
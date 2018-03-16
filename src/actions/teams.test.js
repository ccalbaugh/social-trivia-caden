import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './teams';
import * as types from './actionTypes';

const mockId = 1;
const mockAnswer = 10;
const mockTimeStamp = Date.now();
const mockScore = 10;

it('creates an action to submit an answer', () => {

    const expectedAction = { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId, timeStamp: mockTimeStamp };

    expect(actions.submitAnswer(mockAnswer, mockId, mockTimeStamp)).to.equal(expectedAction);

});

it('creates an action to update the score for a team', () => {

    const expectedAction = { type: types.UPDATE_TEAM, score: mockScore, id: mockId };

    expect(actions.updateTeam(mockScore, mockId)).to.equal(expectedAction);

});
import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './answers';
import * as types from './actionTypes';

const mockId = 1;
const mockAnswer = 10;
const mockTimeStamp = Date.now();

it('creates an action to submit an answer', () => {

    const expectedAction = { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId, timeStamp: mockTimeStamp };

    expect(actions.submitAnswer(mockAnswer, mockId, mockTimeStamp)).to.equal(expectedAction);

});
import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './answers';
import * as types from './actionTypes';

const mockId = 1;

const mockAnswer = 10;

it('creates an action to submit an answer', () => {

    const expectedAction = { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId };

    expect(actions.submitAnswer(mockAnswer, mockId)).to.equal(expectedAction);

});
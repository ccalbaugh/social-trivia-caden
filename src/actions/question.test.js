import 'isomorphic-fetch';
import { expect } from 'code';
import * as actions from './question';
import * as types from './actionTypes';

const currentQuestion = "How much?";

it('creates an action to set the current question in the store', () => {

    const expectedAction = { type: types.SET_CURRENT_QUESTION, currentQuestion };

    expect(actions.setCurrentQuestion(currentQuestion)).to.equal(expectedAction);

});

it('creates an action to fetch the currentQuestion', () => {

    const expectedAction = { type: types.FETCH_CURRENT_QUESTION, currentQuestion };

    expect(actions.fetchCurrentQuestion(currentQuestion)).to.equal(expectedAction);

});
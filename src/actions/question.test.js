import 'isomorphic-fetch';
import { expect } from 'code';
import * as actions from './question';
import * as types from './actionTypes';

const currentQuestion = "How much?";

it('creates an action to update the currentQuestion', () => {

    const expectedAction = { type: types.UPDATE_CURRENT_QUESTION, currentQuestion };

    expect(actions.updateCurrentQuestion(currentQuestion)).to.equal(expectedAction);

});
import { expect } from 'code';
import * as types from '../actions/actionTypes';
import questionReducer from './question';

describe('Given `questionReducer`', () => {

    const currentQuestion = "How much?";

    it('should return the initial state when none is given', () => {

        const expectedState = '';

        expect(questionReducer(undefined, { type: 'NO_MATCH' })).to.equal(expectedState);

    });

    it('should handle UPDATE_CURRENT_QUESTION', () => {

        expect(questionReducer(undefined, { type: types.UPDATE_CURRENT_QUESTION, currentQuestion })).to.equal(currentQuestion);

    });

});
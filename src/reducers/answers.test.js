import { expect } from 'code';
import * as types from '../actions/actionTypes';
import answersReducer from './answers';

const mockAnswer = 10;

describe('Given `answersReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(answersReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

    it('should handle SUBMIT_ANSWER', () => {

        const expectedState = { answers: 10 };

        expect(answersReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer })).to.equal(expectedState);

    });

});
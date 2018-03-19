import { expect } from 'code';
import * as types from '../actions/actionTypes';
import answersReducer from './answers';

const mockAnswer = 10;
const mockId = 'Admin';

describe('Given `answersReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(answersReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

    // it('should handle SUBMIT_ANSWER', () => {

    //     const expectedState = {  [mockId]:  mockAnswer  };

    //     expect(answersReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId })).to.equal(expectedState);

    // });

    
    it('should return iniital state if no id is provided', () => {

        const expectedState = {};

        expect(answersReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: undefined })).to.equal(expectedState);

    });
});
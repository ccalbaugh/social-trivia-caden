import { expect } from 'code';
import * as types from '../actions/actionTypes';
import answersReducer from './answers';

const mockAnswer = 10;
const mockId = 'Admin';
const mockTimeStamp = Date.now();

describe('Given `answersReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(answersReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

    it('should handle SUBMIT_ANSWER', () => {

        const expectedState = {  [mockId]:  { answer: mockAnswer, timeStamp: mockTimeStamp }  };

        expect(answersReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId, timeStamp: mockTimeStamp })).to.equal(expectedState);

    });

    
    it('should return iniital state if no id is provided', () => {

        const expectedState = {};

        expect(answersReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: undefined })).to.equal(expectedState);

    });
});
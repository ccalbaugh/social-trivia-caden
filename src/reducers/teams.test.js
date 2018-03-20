import { expect } from 'code';
import * as types from '../actions/actionTypes';
import teamsReducer from './teams';

const mockAnswer = 10;
const mockId = 'team-1';
const mockTimeStamp = Date.now();
const mockScore = 10;
const initialScore = 0
const initialState = {
    [mockId]: {
        score: 0
    }
}

describe('Given `teamsReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(teamsReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

    it('should handle SUBMIT_ANSWER', () => {

        const expectedState = {  [mockId]:  { answer: mockAnswer, timeStamp: mockTimeStamp }  };

        expect(teamsReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId, timeStamp: mockTimeStamp })).to.equal(expectedState);

    });

    it('should handle UPDATE_TEAM', () => {

        const expectedState = {  [mockId]:  { score: mockScore, answer: null, timeStamp: null  }  };

        expect(teamsReducer(initialState, { type: types.UPDATE_TEAM, score: mockScore, id: mockId})).to.equal(expectedState);

    });

    
    it('should return initial state if no id is provided', () => {

        const expectedState = {};

        expect(teamsReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: undefined })).to.equal(expectedState);

    });
});
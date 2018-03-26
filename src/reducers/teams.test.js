import { expect } from 'code';
import * as types from '../actions/actionTypes';
import teamsReducer, { isShowingAnswers } from './teams';

const mockAnswer = 10;
const mockId = 'team-1';
const mockTimeStamp = Date.now();
const mockScore = 10;
const initialScore = 0
const initialState = {
    [mockId]: {
        score: 0,
        answer: 0,
        timeStamp: 0,
        createdAt: mockTimeStamp
    }
}
const mockTeams =  { [mockId]:  { score: mockScore, answer: 56, timeStamp: 13456465  }  }

describe('Given `teamsReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(teamsReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

    it('should handle CREATE_TEAM', () => {

        const expectedState = initialState

        expect(teamsReducer(undefined, { type: types.CREATE_TEAM, id: mockId, createdAt: mockTimeStamp})).to.equal(expectedState);

    })

    it('should handle SUBMIT_ANSWER', () => {

        const expectedState = {  [mockId]:  { answer: mockAnswer, timeStamp: mockTimeStamp, score: 0, createdAt: mockTimeStamp }  };

        expect(teamsReducer(initialState, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId, timeStamp: mockTimeStamp })).to.equal(expectedState);

    });

    it('should handle UPDATE_TEAM', () => {

        const expectedState = {  [mockId]:  { score: mockScore, answer: 0, timeStamp: 0, createdAt: mockTimeStamp  }  };

        expect(teamsReducer(initialState, { type: types.UPDATE_TEAM, score: mockScore, id: mockId})).to.equal(expectedState);

    });

    
    it('should return initial state if no id is provided', () => {

        const expectedState = {};

        expect(teamsReducer(undefined, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: undefined })).to.equal(expectedState);

    });

    it('should handle FETCH_TEAMS', () => {

        expect(teamsReducer(initialState, { type: types.FETCH_TEAMS, teams: mockTeams })).to.equal(mockTeams);

    });
});

describe('Given `isShowingAnswers`', () => {

    it('should handle `TOGGLE_SHOW_ANSWERS`', () => {

        const expectedState = true

        expect(isShowingAnswers(undefined, { type: types.TOGGLE_SHOW_ANSWERS, isShowingAnswers: false })).to.equal(expectedState)

    })

})
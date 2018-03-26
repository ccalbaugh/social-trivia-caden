import { expect } from 'code';
import * as types from '../actions/actionTypes';
import teamsReducer, { isShowingAnswers } from './teams';

const mockAnswer = 10;
const mockId = 'team-1';
const mockTimeStamp = Date.now();
const mockScore = 10;
const initialScore = 0;
const mockIsSubmitted = false;
const initialState = {
    [mockId]: {
        score: 0,
        answer: 0,
        answeredAt: 0,
        createdAt: mockTimeStamp,
        isSubmitted: false
    }
}
const mockTeams =  { [mockId]:  {  score: mockScore, answer: mockAnswer, answeredAt: mockTimeStamp, isSubmitted: mockIsSubmitted  }  }

describe('Given `teamsReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(teamsReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

    it('should handle CREATE_TEAM', () => {

        const expectedState = initialState

        expect(teamsReducer(undefined, { type: types.CREATE_TEAM, id: mockId, createdAt: mockTimeStamp, isSubmitted: mockIsSubmitted})).to.equal(expectedState);

    })

    it('should handle SUBMIT_ANSWER', () => {

        const expectedState = {  [mockId]:  { answer: mockAnswer, answeredAt: mockTimeStamp, score: initialScore, createdAt: mockTimeStamp, isSubmitted: true }  };

        expect(teamsReducer(initialState, { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId, answeredAt: mockTimeStamp, isSubmitted: true  })).to.equal(expectedState);

    });

    it('should handle UPDATE_TEAM', () => {

        const expectedState = {  [mockId]:  { score: mockScore, answer: 0, answeredAt: 0, createdAt: mockTimeStamp, isSubmitted: mockIsSubmitted  }  };

        expect(teamsReducer(initialState, { type: types.UPDATE_TEAM, score: mockScore, id: mockId, isSubmitted: mockIsSubmitted})).to.equal(expectedState);

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
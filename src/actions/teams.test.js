import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './teams';
import * as types from './actionTypes';

const mockId = 'team-1';
const mockAnswer = 10;
const mockTimeStamp = Date.now();
const mockScore = 10;
const mockTeam =  { [mockId]:  { answer: mockAnswer, timeStamp: mockTimeStamp, score: mockScore  }  }

it('creates an action to create a team', () => {

    const expectedAction = { type: types.CREATE_TEAM, id: mockId};

    expect(actions.createTeam(mockId)).to.equal(expectedAction);

});

it('creates an action to submit an answer', () => {

    const expectedAction = { type: types.SUBMIT_ANSWER, answer: mockAnswer, id: mockId, timeStamp: mockTimeStamp, score: 0 };

    expect(actions.submitAnswer(mockAnswer, mockId, mockTimeStamp, 0)).to.equal(expectedAction);

});

it('creates an action to update the score for a team', () => {

    const expectedAction = { type: types.UPDATE_TEAM, score: mockScore, id: mockId };

    expect(actions.updateTeam(mockScore, mockId)).to.equal(expectedAction);

});

it('creates an action to fetch the teams', () => {

    const expectedAction = { type: types.FETCH_TEAMS, teams: mockTeam };

    expect(actions.fetchTeams(mockTeam)).to.equal(expectedAction);

});

it('creates an action to show all team answers', () => {

    const expectedAction = { type: types.TOGGLE_SHOW_ANSWERS, isShowingAnswers: true }

    expect(actions.toggleShowAnswers(true)).to.equal(expectedAction)

})
import * as types from './actionTypes';
import { database } from '../data/firebase'

const teams = database.ref('teams/')
const isShowingAnswersInDB = database.ref('isShowingAnswers')

export function createTeam(id, createdAt) {
    return {
        type: types.CREATE_TEAM,
        id,
        createdAt
    };
}

export function createTeamInDB(id, createdAt) {
    return dispatch => {
        teams.child(id).set({ answer: 0, answeredAt: 0, score: 0, createdAt, isSubmitted: false })
        dispatch(createTeam(id, createdAt)) 
    }
}

export function fetchTeams(teams) {
    return {
        type: types.FETCH_TEAMS,
        teams
    };
}

export function fetchTeamsFromDB() {
    return dispatch => {
      teams.on('value', snapshot => {
        dispatch(fetchTeams(snapshot.val()))
      });
    }
}

export function fetchIsShowingAnswers() {
    return dispatch => {
        isShowingAnswersInDB.on('value', snapshot => {
            dispatch({ type: types.FETCH_IS_SHOWING_ANSWERS, isShowingAnswers: snapshot.val() })
        })
    }
}

export function submitAnswer(answer, id, answeredAt, isSubmitted) {
    return {
        type: types.SUBMIT_ANSWER,
        answer,
        id,
        answeredAt,
        isSubmitted
    };
}

export function submitAnswerToDB(answer, id, answeredAt, isSubmitted) {
   return dispatch => {
      teams.child(id).update({ answer, id, answeredAt, isSubmitted })
      dispatch(submitAnswer(answer, id, answeredAt, isSubmitted))
   }
}

export function updateTeam(score, id) {
    teams.child(id).update({ answer: 0, answeredAt: 0 })
    return {
        type: types.UPDATE_TEAM,
        score,
        id
    };
}

export function submitTeamScoreToDB(currentScore, id, addToScore) {
    return dispatch => {
        const score = currentScore + addToScore
        teams.child(id).update({ score: score, isSubmitted: false })
    }
}

export function toggleShowAnswers(isShowingAnswers) {
    isShowingAnswersInDB.set(!isShowingAnswers)
    return {
        type: types.TOGGLE_SHOW_ANSWERS,
        isShowingAnswers
    }
}
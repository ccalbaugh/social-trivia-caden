import * as types from './actionTypes';
import { database } from '../data/firebase'

const teams = database.ref('teams/')
const isShowingAnswersInDB = database.ref('isShowingAnswers')

export function createTeam(id) {
    return {
        type: types.CREATE_TEAM,
        id
    };
}

export function createTeamInDB(id) {
    return dispatch => {
        teams.child(id).set({ answer: 0, timestamp: 0, score: 0, isSubmitted: false })
        dispatch(createTeam(id)) 
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

export function submitAnswer(answer, id, timestamp, isSubmitted) {
    return {
        type: types.SUBMIT_ANSWER,
        answer,
        id,
        timestamp,
        isSubmitted
    };
}

export function submitAnswerToDB(answer, id, timestamp, isSubmitted) {
   return dispatch => {
      teams.child(id).update({ answer, id, timestamp, isSubmitted })
      dispatch(submitAnswer(answer, id, timestamp, isSubmitted))
   }
}

export function updateTeam(score, id) {
    teams.child(id).update({ answer: 0, timestamp: 0 })
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
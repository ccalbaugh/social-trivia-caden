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
        teams.child(id).set({ answer: 0, timestamp: 0, score: 0 })
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
            console.log("IS SHOWING ANSERS: ", snapshot.val())
            dispatch({ type: types.FETCH_IS_SHOWING_ANSWERS, isShowingAnswers: snapshot.val() })
        })
    }
}

export function submitAnswer(answer, id, timeStamp, score) {
    return {
        type: types.SUBMIT_ANSWER,
        answer,
        id,
        timeStamp,
        score
    };
}

export function submitAnswerToDB(answer, id, timestamp) {
   return dispatch => {
      teams.child(id).update({ answer, id, timestamp })
      dispatch(submitAnswer(answer, id, timestamp))
   }
}

export function updateTeam(score, id) {
    return {
        type: types.UPDATE_TEAM,
        score,
        id
    };
}

export function submitTeamScoreToDB(currentScore, id, addToScore) {
    return dispatch => {
        const score = currentScore + addToScore
        teams.child(id).update({ score: score })
    }
}

export function toggleShowAnswers(isShowingAnswers) {
    isShowingAnswersInDB.set(!isShowingAnswers)
    return {
        type: types.TOGGLE_SHOW_ANSWERS,
        isShowingAnswers
    }
}
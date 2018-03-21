import * as types from './actionTypes';
import { database } from '../data/firebase'

export function createTeam(id) {
    return {
        type: types.CREATE_TEAM,
        id
    };
}

export function createTeamInDB(id) {
    return dispatch => {
        database.child(id).set({ answer: 0, timestamp: 0, score: 0 })
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
      database.on('value', snapshot => {
        dispatch(fetchTeams(snapshot.val()))
      });
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
      database.child(id).update({ answer, id, timestamp })
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
        database.child(id).update({ score: score })
    }
}

 
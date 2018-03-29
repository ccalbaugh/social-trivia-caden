import * as types from './actionTypes';
import { database } from '../data/firebase'

const currentQuestionInDB = database.ref('currentQuestion/')

export function setCurrentQuestion(currentQuestion) {
    currentQuestionInDB.set(currentQuestion)
    return {
        type: types.SET_CURRENT_QUESTION,
        currentQuestion 
    };
}

export function fetchCurrentQuestionFromDB() {
    return dispatch => {
        currentQuestionInDB.on('value', snapshot => {
            dispatch(fetchCurrentQuestion(snapshot))
        })
    };
}

export function fetchCurrentQuestion(currentQuestion) {
    return {
        type: types.FETCH_CURRENT_QUESTION,
        currentQuestion
    };
}

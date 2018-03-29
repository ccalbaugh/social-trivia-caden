import * as types from './actionTypes';
import { database } from '../data/firebase'

const currentQuestionInDB = database.ref('currentQuestion/')

export function updateCurrentQuestion(currentQuestion) {
    currentQuestionInDB.set(currentQuestion)
    return {
        type: types.UPDATE_CURRENT_QUESTION,
        currentQuestion 
    };
}

export function fetchCurrentQuestionFromDB() {
    return dispatch => {
        currentQuestionInDB.on('value', snapshot => {
            dispatch(updateCurrentQuestion(snapshot))
        })
    };
}

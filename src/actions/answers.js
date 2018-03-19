import * as types from './actionTypes';
import { database } from '../data/firebase'

 export function fetchAnswersFromDB() {
    return dispatch => {
      database.on('value', snapshot => {
        dispatch({
          type: types.FETCH_ANSWERS_FROM_DB,
          answers: snapshot.val()
        });
      });
    };
}

export function submitAnswerToDB(answer, id) {
   return dispatch => {
      database.child(id).set({ answer, id })
   }
}
import * as types from '../actions/actionTypes';

function fetchAnswersFromDB (state, action) {
    return  action.answers
} 

function submitAnswerToDB(state, action) {
    return action.id ? 
    {
        ...state,
        [action.id]: action.answer
    } 
    : state
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.SUBMIT_ANSWER_TO_DB]: submitAnswerToDB,
        [types.FETCH_ANSWERS_FROM_DB]: fetchAnswersFromDB
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
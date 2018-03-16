import * as types from '../actions/actionTypes';

function submitAnswer(state, action) {
    return action.id ? {
        ...state,
        [action.id]: {
            answer: action.answer,
            timeStamp: action.timeStamp
        }
    } : 
    state
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.SUBMIT_ANSWER]: submitAnswer
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
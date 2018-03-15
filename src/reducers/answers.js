import * as types from '../actions/actionTypes';

function submitAnswer(state, action) {
    return action.id ? 
    {
        ...state,
        [action.id]: action.answer
    } 
    : state
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.SUBMIT_ANSWER]: submitAnswer
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
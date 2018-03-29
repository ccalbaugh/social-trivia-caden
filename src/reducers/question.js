import * as types from '../actions/actionTypes';

function updateCurrentQuestion(state, action) {
    return action.currentQuestion;
}

export default function(state = '', action) {
    const actionsHandler = {
        [types.UPDATE_CURRENT_QUESTION]: updateCurrentQuestion
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
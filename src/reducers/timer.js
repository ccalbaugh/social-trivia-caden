import * as types from '../actions/actionTypes';

function startTimer(state, action) {
    return {
        ...state,
        isTimerRunning: action.isTimerRunning
    };
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.START_TIMER]: startTimer
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
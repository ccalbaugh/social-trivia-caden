import * as types from '../actions/actionTypes';

const defaultTime = 60;

function startTimer(state, action) {
    return {
        ...state,
        isTimerRunning: action.isTimerRunning
    };
}

function resetTimer(state, action) {
    return {
        ...state,
        isTimerRunning: false,
        currentTime: action.setTime
    };
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.START_TIMER]: startTimer,
        [types.RESET_TIMER]: resetTimer
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
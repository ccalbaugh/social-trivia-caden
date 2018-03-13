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
        currentTime: action.defaultTime
    };
}

function updateTimer(state, action) {
    return {
        ...state,
        isTimerRunning: false,
        currentTime: action.setTime,
        defaultTime: action.setTime
    };
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.START_TIMER]: startTimer,
        [types.RESET_TIMER]: resetTimer,
        [types.UPDATE_TIMER]: updateTimer
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
import * as types from '../actions/actionTypes';

function controlTimer(state, action) {
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

function decrementTimer(state, action) {
    return {
        ...state,
        currentTime: action.timeLeft - 1
    };
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.CONTROL_TIMER]: controlTimer,
        [types.RESET_TIMER]: resetTimer,
        [types.UPDATE_TIMER]: updateTimer,
        [types.DECREMENT_TIMER]: decrementTimer
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
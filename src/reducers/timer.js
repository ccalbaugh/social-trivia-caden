import * as types from '../actions/actionTypes';

function createTimer(state, action) {
    return {
        isTimerRunning: action.isTimerRunning,
        defaultTime: 60,
        currentTime: 60
    };
}

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
        currentTime: action.currentTime
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

function fetchTimer(state, action) {
    return action.timer
}

export default function(state = {}, action) {
    const actionsHandler = {
        [types.CREATE_TIMER]: createTimer,
        [types.CONTROL_TIMER]: controlTimer,
        [types.RESET_TIMER]: resetTimer,
        [types.UPDATE_TIMER]: updateTimer,
        [types.DECREMENT_TIMER]: decrementTimer,
        [types.FETCH_TIMER]: fetchTimer
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
import * as types from './actionTypes';

export function updateTimer(setTime) {
    return {
        type: types.UPDATE_TIMER,
        setTime
    };
} 

export function startTimer(isTimerRunning) {
    return {
        type: types.START_TIMER,
        isTimerRunning
    };
} 

export function resetTimer(defaultTime) {
    return {
        type: types.RESET_TIMER,
        defaultTime
    };
} 

export function decrementTimer(timeLeft) {
    return {
        type: types.DECREMENT_TIMER,
        timeLeft
    };
} 
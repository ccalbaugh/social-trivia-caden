import * as types from './actionTypes';

export function submitAnswer(answer) {
    return {
        type: types.SUBMIT_ANSWER,
        answer
    };
}

export function startTimer(isTimerStarted) {
    return {
        type: types.START_TIMER,
        isTimerStarted
    };
} 

export function resetTimer(setTime) {
    return {
        type: types.RESET_TIMER,
        setTime
    };
} 
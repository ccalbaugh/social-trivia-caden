import * as types from './actionTypes';
import { database } from '../data/firebase'

const timer = database.ref('timer/')

export function createTimer() {
    return dispatch => {
        timer.set({ isTimerRunning: false, currentTime: 60, defaultTime: 60 })
        dispatch({
            type: types.CREATE_TIMER,
            isTimerRunning: false
        })
    };
}

export function updateTimer(setTime) {
    return dispatch => {
        timer.update({ 
            isTimerRunning: false,
            currentTime: setTime,
            defaultTime: setTime
        })
        dispatch({
            type: types.UPDATE_TIMER,
            setTime
        })
    };
} 

export function controlTimer(isTimerRunning) {
    return dispatch => {
        timer.update({ isTimerRunning })
        dispatch({
            type: types.CONTROL_TIMER,
            isTimerRunning
        })
    };
}

export function resetTimer(defaultTime) {
    return dispatch => {
        timer.update({ isTimerRunning: false, currentTime: defaultTime })
        dispatch({
            type: types.RESET_TIMER,
            currentTime: defaultTime
        })
    };
} 

export function decrementTimer(timeLeft) {
    return dispatch => {
        timer.update({ currentTime: timeLeft - 1 })
        dispatch({
            type: types.DECREMENT_TIMER,
            timeLeft
        }) 
    };
} 

export function fetchTimer() {
    return dispatch => {
        timer.on('value', snapshot => {
          dispatch({
              type: types.FETCH_TIMER,
              timer: snapshot.val()
          })
        });
      }
}
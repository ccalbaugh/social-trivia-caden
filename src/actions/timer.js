import * as types from './actionTypes';
import { database } from '../data/firebase'

const timer = database.ref('timer/')

export function createTimer() {
    timer.set({ isTimerRunning: false, currentTime: 60, defaultTime: 60 })
    return {
        type: types.CREATE_TIMER,
        isTimerRunning: false
    }
}

export function updateTimer(setTime) {
    timer.update({ isTimerRunning: false, currentTime: setTime, defaultTime: setTime })
    return {
        type: types.UPDATE_TIMER,
        setTime
    }
} 

export function controlTimer(isTimerRunning) {
   timer.update({ isTimerRunning })
   return {
        type: types.CONTROL_TIMER,
        isTimerRunning
    }
}

export function resetTimer(defaultTime) {
    timer.update({ isTimerRunning: false, currentTime: defaultTime })
    return {
        type: types.RESET_TIMER,
        currentTime: defaultTime
    }
} 

export function decrementTimer(timeLeft) {
    timer.update({ currentTime: timeLeft - 1 })
    return {
        type: types.DECREMENT_TIMER,
        timeLeft
    }
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
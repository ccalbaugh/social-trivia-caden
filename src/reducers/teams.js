import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux'

function submitAnswer(state = {}, action) {
    return action.id ? {
        ...state,
        [action.id]: {
            answer: action.answer,
            timeStamp: action.timeStamp,
            score: [action.id].score || 0
        }
    } : 
    state
}

function updateTeam(state, action) {
    return {
        ...state,
        [action.id]: {
            answer: null,
            timeStamp: null,
            score: ((state[action.id].score || 0) + action.score)
        }
    };
}

export default function(state = {}, action) {

    const actionsHandler = {
        [types.SUBMIT_ANSWER]: submitAnswer,
        [types.UPDATE_TEAM]: updateTeam
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
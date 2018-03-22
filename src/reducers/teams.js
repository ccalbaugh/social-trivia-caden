import * as types from '../actions/actionTypes';

function createTeam(state, action) {
    return {
        answer: undefined,
        timeStamp: undefined,
        score: 0
    }
}

function fetchTeams (state, action) {
    return  action.teams
} 

function submitAnswer(state, action) {
    return action.id ? {
        ...state,
        answer: action.answer,
        timeStamp: action.timeStamp
    } : state
}

function updateTeam(state, action) {
    return {
        ...state,
        answer: null,
        timeStamp: null,
        score: (state.score + action.score)
    }
}

export default function(state = {}, action) {

    const actionsHandler = {
        [types.CREATE_TEAM]: createTeam,
        [types.SUBMIT_ANSWER]: submitAnswer,
        [types.FETCH_TEAMS]: fetchTeams,
        [types.UPDATE_TEAM]: updateTeam
    };

    const reducer = actionsHandler[action.type];

    
    return reducer ? (
        action.id ? { 
            ...state, 
            [action.id]: reducer(state[action.id], action) 
        } : reducer(state, action)
    ) : state  
} 
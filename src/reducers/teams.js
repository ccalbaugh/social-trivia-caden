import * as types from '../actions/actionTypes';

function createTeam(state, action) {
    return {
        answer: undefined,
        timestamp: undefined,
        score: 0,
        isSubmitted: false
    }
}

function fetchTeams (state, action) {
    return action.teams
} 

function submitAnswer(state, action) {
    return action.id ? {
        ...state,
        answer: action.answer,
        timestamp: action.timestamp,
        isSubmitted: true
    } : state
}

function updateTeam(state, action) {
    return {
        ...state,
        answer: null,
        timestamp: null,
        score: (state.score + action.score),
        isSubmitted: false
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
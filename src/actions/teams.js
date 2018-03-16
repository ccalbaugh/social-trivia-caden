import * as types from './actionTypes';

export function submitAnswer(answer, id, timeStamp) {
    return {
        type: types.SUBMIT_ANSWER,
        answer,
        id,
        timeStamp
    };
}

export function updateTeam(score, id) {
    return {
        type: types.UPDATE_TEAM,
        score,
        id
    };
}
import * as types from './actionTypes';

export function submitAnswer(answer, id) {
    return {
        type: types.SUBMIT_ANSWER,
        answer,
        id
    };
}
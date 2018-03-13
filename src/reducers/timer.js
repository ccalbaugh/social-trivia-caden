import * as types from '../actions/actionTypes';

export default function(state = {}, action) {
    const actionsHandler = {};

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state;
}
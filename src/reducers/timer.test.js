import { expect } from 'code';
import * as types from '../actions/actionTypes';
import timerReducer from './timer';


describe('Given `timerReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(timerReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

});
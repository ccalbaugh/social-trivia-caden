import { expect } from 'code';
import * as types from '../actions/actionTypes';
import timerReducer from './timer';

const mockDefaultTime = 60;

describe('Given `timerReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(timerReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

    it('should handle START_TIMER', () => {

        const expectedState = { isTimerRunning: true };

        expect(timerReducer(undefined, { type: types.START_TIMER, isTimerRunning: true })).to.equal(expectedState);

    });

    it('should handle RESET_TIMER', () => {

        const expectedState = { currentTime: mockDefaultTime, isTimerRunning: false };

        expect(timerReducer(undefined, { type: types.RESET_TIMER, setTime: mockDefaultTime })).to.equal(expectedState);

    });

});
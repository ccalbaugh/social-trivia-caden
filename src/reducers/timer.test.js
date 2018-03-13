import { expect } from 'code';
import * as types from '../actions/actionTypes';
import timerReducer from './timer';

const mockDefaultTime = 60;
const mockSetTime = 40;

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

        expect(timerReducer(undefined, { type: types.RESET_TIMER, defaultTime: mockDefaultTime })).to.equal(expectedState);

    });

    it('should handle UPDATE_TIMER', () => {

        const expectedState = { currentTime: mockSetTime, defaultTime: mockSetTime, isTimerRunning: false };

        expect(timerReducer(undefined, { type: types.UPDATE_TIMER, setTime: mockSetTime })).to.equal(expectedState);

    });

});
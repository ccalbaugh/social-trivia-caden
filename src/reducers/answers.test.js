import { expect } from 'code';
import * as types from '../actions/actionTypes';
import answersReducer from './answers';


describe('Given `answersReducer`', () => {

    it('should return the initial state when none is given', () => {

        const expectedState = {};

        expect(answersReducer(undefined, { type: 'NO_MATCH'})).to.equal(expectedState);

    });

});
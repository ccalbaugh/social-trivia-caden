import 'isomorphic-fetch';
import { expect } from 'code';
import sinon from 'sinon';
import * as actions from './answers';
import * as types from './actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAnswersFromDB } from './answers';

const createMockStore = configureMockStore([thunk])
const store = createMockStore({answers:{}})

it('creates an action to fetch the answers from the database', () => {

    let sandbox, fetchAnswersFromDBStub, mockId, mockAnswer, mockResponse

    mockId = 1;

    mockAnswer = { answer: 22, id: 'admin' };

    mockResponse = {
        answers: { answer: 22, id: 'admin' }
    }

    beforeEach(() => {

        sandbox = sinon.createSandbox(),
        fetchAnswersFromDBStub = sandbox.stub().returns(mockResponse)
    })
    
    afterEach(() => {
    
        sandbox.restore()
    })

    const expectedAction = { type: types.FETCH_ANSWERS_FROM_DB, answers: mockResponse.answers };
 
    store.dispatch(fetchAnswersFromDB())
    //expect(store.getActions()).to.equal(expectedAction)    

});
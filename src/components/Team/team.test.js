import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { Team } from './team'

describe('Given `Team`' ,() => {

    let component, sandbox, fetchTimerSpy, fetchTeamsFromDBSpy;
    const mockId = 'team-1'
    const match = { 
        params: {
           id: mockId 
    }}
    
    function requiredProps(overrides= {}) {
        return {
            fetchTimer: fetchTimerSpy,
            fetchTeamsFromDB: fetchTeamsFromDBSpy,
            match,
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {
        const newProps = requiredProps(props)
        return shallow(<Team {...newProps}/>)

    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        fetchTimerSpy = sandbox.spy()
        fetchTeamsFromDBSpy = sandbox.spy()
        component = renderComponent()
    })
    
    afterEach(() => {
    
        sandbox.restore()
    })

    
    it('it should exist as a `section` tag', () => {
        
        expect(component.type()).to.equal('section')

    })

    it('should contain a `Connect(AnswerForm)`', () => {

        expect(component.find('Connect(AnswerForm)').exists()).to.be.true()

    })
    
    describe('When mounted', () => {

        it('should dispatch fetchTimer() and fetchTeamsFromDB()', () => {

            sinon.assert.calledOnce(fetchTimerSpy)
            sinon.assert.calledOnce(fetchTeamsFromDBSpy)
        })
    })
})
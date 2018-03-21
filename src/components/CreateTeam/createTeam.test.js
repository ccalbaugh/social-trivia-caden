import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { CreateTeam } from './createTeam'

describe('Given `CreateTeam`', () => {

    let component,
        sandbox,
        createTeamInDBMock
    
    function requiredProps(overrides = {}) {
        return {
            createTeamInDB: createTeamInDBMock,
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {
        const newProps = requiredProps(props)
        return shallow(<CreateTeam {...newProps}/>)

    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        createTeamInDBMock = sandbox.spy()
        component = renderComponent()
    })
    
    it('it should exist as a `form` tag', () => {
        
        expect(component.type()).to.equal('form')

    })

    it('should contain a `input` and a `button`', () => {

        expect(component.find('input').exists()).to.be.true()
        expect(component.find('button').exists()).to.be.true()        

    })

    describe('When the form is submitted', () => {

        it('should call createTeamInDB', () => {

            component.find('form').simulate('submit')

            sinon.assert.calledOnce(createTeamInDBMock)

        })

    })

})
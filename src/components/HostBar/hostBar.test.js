import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { HostBar } from './HostBar'

describe('Given `HostBar`' ,() => {

    let component,
        sandbox,
        updateTeamSpy
    
    function requiredProps(overrides= {}) {
        return {
            updateTeam: updateTeamSpy,
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {
        const newProps = requiredProps(props)
        return shallow(<HostBar {...newProps}/>)

    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        updateTeamSpy = sandbox.spy()
        component = renderComponent()
    })
    
    it('it should exist as a `section` tag', () => {
        
        expect(component.type()).to.equal('section')

    })

    it('should contain a connected `AnswerForm` component with an id set as admin', () => {

        const answerForm = component.find('Connect(AnswerForm)')

        expect(answerForm.exists()).to.be.true()
        expect(answerForm.first().props().id).to.equal(component.state().teams[0].id)
    })

    it('should contain a connected `Timer` component', () => {

        expect(component.find('Connect(Timer)').exists()).to.be.true()
    })

    it('should contain a `button` with a specific class name', () => {

        expect(component.find('.update-teams-button').type()).to.equal('button')

    })

    describe('Given `button`', () => {

        describe('When there are no teams', () => {

            it('should be disabled', () => {

                component = renderComponent({ teams: {} })

                expect(component.find('.update-teams-button').props().disabled).to.be.true()

            })

        })

        describe('When there are teams', () => {      

            describe('when the `button` is clicked', () => {
    
                it('should call `updateTeam`', () => {

                    component = renderComponent({ updateTeam: updateTeamSpy, teams: { 'admin': { answer: 1 }, 'team-1': { answer: 1 } } })
                
                    component.find('.update-teams-button').simulate('click')
    
                    sinon.assert.called(updateTeamSpy)
    
                })
    
            })

        })
        
    })

})
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { HostBar } from './HostBar'

describe('Given `HostBar`' ,() => {

    let component,
        sandbox,
        updateTeamSpy,
        submitTeamSpy,
        fetchTeamsFromDBSpy,
        toggleShowAnswersSpy
    
    function requiredProps(overrides= {}) {
        return {
            updateTeam: updateTeamSpy,
            submitTeamScoreToDB: submitTeamSpy,
            fetchTeamsFromDB: fetchTeamsFromDBSpy,
            toggleShowAnswers: toggleShowAnswersSpy,
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
        submitTeamSpy = sandbox.spy()
        fetchTeamsFromDBSpy = sandbox.spy()
        toggleShowAnswersSpy = sandbox.spy()
        component = renderComponent()
    })

    afterEach(() => {    
        sandbox.restore()
    })
    
    it('it should exist as a `section` tag', () => {
        
        expect(component.type()).to.equal('section')

    })

    it('should contain a connected `AnswerForm` component with an id set as admin', () => {

        const answerForm = component.find('Connect(AnswerForm)')

        expect(answerForm.exists()).to.be.true()
        expect(answerForm.first().props().id).to.equal('admin')
    })

    it('should contain a connected `Timer` component', () => {

        expect(component.find('Connect(Timer)').exists()).to.be.true()
    })

    it('should contain a `button` to update teams', () => {

        expect(component.find('.update-teams-button').type()).to.equal('button')
    
    })
    
    it('should contain a `Link` to open the teams view', () => {
    
        expect(component.find('Link').exists()).to.be.true()
    
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
    
                it('should call `updateTeam` and `toggleShowAnswers`', () => {

                    component = renderComponent({ updateTeam: updateTeamSpy, teams: { 'admin': { answer: 1 }, 'team-1': { answer: 1 } } })
                
                    component.find('.update-teams-button').simulate('click')
    
                    sinon.assert.called(updateTeamSpy)
                    sinon.assert.called(toggleShowAnswersSpy)
                    
    
                })
    
            })

        })
        
    })

    it('should contain a `button` to show answers', () => {

        expect(component.find('.show-answers-button').type()).to.equal('button')        

    })

    describe('When the button is clicked', () => {

        it('should call `showAnswers`', () => {

            component.find('.show-answers-button').simulate('click')
            
            sinon.assert.called(toggleShowAnswersSpy)

        })

    })

})
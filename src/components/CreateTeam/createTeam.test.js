import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { CreateTeam } from './createTeam'

describe('Given `CreateTeam`', () => {

    let component,
        sandbox,
        createTeamInDBMock,
        fetchTeamsFromDBMock

    const mockTeams = {
        'admin': {
            answer: 1
        },
        'team-2': {
            answer: 2,
            score: 0
        },
        'team-3': {
            answer: 1,
            score: 0
        }
    }
    
    const mockTeam = { id: 'team-1', answer: 1, score: 0 }   

    function requiredProps(overrides = {}) {
        return {
            createTeamInDB: createTeamInDBMock,
            fetchTeamsFromDB: fetchTeamsFromDBMock,
            teams: mockTeams,
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
        fetchTeamsFromDBMock = sandbox.spy()
        component = renderComponent()
    })

    afterEach(() => {    
        sandbox.restore()
    })
    
    it('it should exist as a `form` tag', () => {
        
        expect(component.type()).to.equal('form')

    })

    it('should contain a `input` and a `button`', () => {

        expect(component.find('input').exists()).to.be.true()
        expect(component.find('button').exists()).to.be.true()        

    })

    describe('When a user types in the input', () => {

        it('should update the `currentInput` in state', () => {

            expect(component.state().currentInput).to.equal('')

            component.find('input').simulate('change', {
                target: {
                    value: 'e'
                }
            })
        })
    })

    describe('When the form is submitted', () => {

        describe('When the team does not already exist', () => {

            it('should call createTeamInDB', () => {

                component.setState({ currentInput: 'team-1' })
    
                component.find('form').simulate('submit', {
                    preventDefault: () => {}
                })
    
                sinon.assert.calledOnce(createTeamInDBMock)
    
            })

        })

        describe('When the team does already exist', () => {

            it('should contain a `span` with a proper className to let the user know the team exists', () => {

                expect(component.find('.team-taken').exists()).to.be.false()

                component.setState({ currentInput: 'team-2' })
    
                component.find('form').simulate('submit', {
                    preventDefault: () => {}
                })
    
                expect(component.find('.team-taken').exists()).to.be.true()
    
            })

        })

       
    })
})
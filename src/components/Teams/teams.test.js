import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { Teams } from './Teams'

const numberOfTeams = 6

describe('Given `Teams`' ,() => {

    let component,
        sandbox,
        fetchTeamsFromDBSpy,
        fetchIsShowingAnswsersSpy

    const mockTeams = [
        { id: 'team-1', answer: 1, score: 0 },
        { id: 'team-2', answer: 1, score: 0 }        
    ]
    
    function requiredProps(overrides= {}) {
        return {
            fetchTeamsFromDB: fetchTeamsFromDBSpy,
            fetchIsShowingAnswers: fetchIsShowingAnswsersSpy,
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {
        const newProps = requiredProps(props)
        return shallow(<Teams {...newProps}/>)

    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        fetchTeamsFromDBSpy = sandbox.spy()
        fetchIsShowingAnswsersSpy = sandbox.spy()
        component = renderComponent()
    })
    
    it('it should exist as a `section` tag', () => {
        
        expect(component.type()).to.equal('section')

    })

    it('shoud contain a `ul` with a proper class name', () => {

        expect(component.find('.team-list').type()).to.equal('ul')

    })

    describe('Given `ul`', () => {

        it('should render a `li` with a proper class name for every team in state', () => {

            component.setState({ teams: mockTeams })            

            expect(component.find('.team-list-item').length).to.equal(mockTeams.length)

        })

        describe('Given `li`', () => {

            it('should have a key set to each team id', () => {

                component = renderComponent({ teams: mockTeams })

                component.setState({ teams: mockTeams })

                const teamListItem = component.find('.team-list-item')

                expect(teamListItem.first().key()).to.equal(component.state().teams[0].id)

            })

            it('should contain 3 `span` elements with proper class names', () => {

                component = renderComponent({ teams: mockTeams })   
                
                component.setState({ teams: mockTeams })                
                
                const teamListItem = component.find('.team-list-item')   

                expect(teamListItem.first().find('span').length).to.equal(2)

            })

        })

    })
})
import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import Teams from './Teams'

const numberOfTeams = 6

describe('Given `Teams`' ,() => {

    let component
    
    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<Teams {...props}/>)

    }

    beforeEach(() => {
        component = renderComponent()
    })
    
    it('it should exist as a `section` tag', () => {
        
        expect(component.type()).to.equal('section')

    })

    it('shoud contain a `ul` with a proper class name', () => {

        expect(component.find('.team-list').type()).to.equal('ul')

    })

    it('should contain a local state with all the teams available', () => {

        expect(component.state().teams.length).to.equal(numberOfTeams)

    })

    describe('Given `ul`', () => {

        it('should render a `li` with a proper class name for every team in state', () => {

            expect(component.find('.team-list-item').length).to.equal(component.state().teams.length)

        })

        describe('Given `li`', () => {

            it('should have a key set to each team id', () => {

                expect(component.find('.team-list-item').first().key()).to.equal(component.state().teams[0].id)

            })

            it('should contain a `AnswerForm` with an id set to each team id', () => {

                expect(component.find('AnswerForm').first().props().id).to.equal(component.state().teams[0].id)

            })

        })

    })
})
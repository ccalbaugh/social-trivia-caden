import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import { HostBar } from './HostBar'

describe('Given `HostBar`' ,() => {
    
    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<HostBar {...props}/>)

    }
    
    it('it should exist as a `section` tag', () => {

        const component = renderComponent()
        
        expect(component.type()).to.equal('section')

    })

    it('should contain a connected `AnswerForm` component with an id set as admin', () => {

        const component = renderComponent()
        const answerForm = component.find('Connect(AnswerForm)')

        expect(answerForm.exists()).to.be.true()
        expect(answerForm.first().props().id).to.equal(component.state().teams[0].id)
    })

    it('should contain a connected `Timer` component', () => {

        const component = renderComponent()

        expect(component.find('Connect(Timer)').exists()).to.be.true()
    })

    it('should contain a `button` with a specific class name', () => {

        const component = renderComponent()

        expect(component.find('.update-teams-button').type()).to.equal('button')

    })
})
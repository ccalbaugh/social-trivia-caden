import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import { HostBar } from './HostBar'
import { Timer } from '../Timer/timer'

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

    it('should contain a connected `AnswerForm` component', () => {

        const component = renderComponent()

        expect(component.find('Connect(AnswerForm)').exists()).to.be.true()
    })

    it('should contain a connected `Timer` component', () => {

        const component = renderComponent()

        expect(component.find('Connect(Timer)').exists()).to.be.true()
    })
})
import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import { Timer } from './Timer'

describe('Given `Timer`' ,() => {
    
    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<Timer {...props}/>)

    }
    
    it('it should exist as a `section` tag', () => {

        const component = renderComponent()
        
        expect(component.type()).to.equal('section')

    })
})
import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import HostBar from './HostBar'

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
})
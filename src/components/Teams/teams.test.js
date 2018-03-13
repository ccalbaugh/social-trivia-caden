import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import Teams from './Teams'

describe('Given `Teams`' ,() => {
    
    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<Teams {...props}/>)

    }
    
    it('it should exist as a `section` tag', () => {

        const component = renderComponent()
        
        expect(component.type()).to.equal('section')

    })
})
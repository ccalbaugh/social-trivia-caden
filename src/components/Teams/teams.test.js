import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import Teams from './Teams'

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
})
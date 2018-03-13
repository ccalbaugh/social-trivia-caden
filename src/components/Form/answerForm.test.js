import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import AnswerForm from './AnswerForm'

describe('Given `AnswerForm`' ,() => {
    
    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<AnswerForm {...props}/>)

    }
    
    it('it should exist as a `section` tag', () => {

        const component = renderComponent()
        
        expect(component.type()).to.equal('section')

    })
})
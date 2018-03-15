import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import SocialTriviaApp from './SocialTriviaApp'

describe('Given `SocialTriviaApp`' ,() => {
    
    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<SocialTriviaApp {...props}/>)

    }
    
    it('it should exist as a `main` tag', () => {

        const component = renderComponent()
        
        expect(component.type()).to.equal('main')

    })

    it('should contain a connected `AnswerForm` component', () => {

        const component = renderComponent()

        expect(component.find('Connect(AnswerForm)').exists()).to.be.true()
    })
})
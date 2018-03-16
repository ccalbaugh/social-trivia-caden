import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import SocialTriviaApp from './SocialTriviaApp'
import HostBar from '../components/HostBar/hostBar'

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

    it('should contain a `HostBar` component', () => {

        const component = renderComponent()

        expect(component.find('HostBar').exists()).to.be.true()
    })
})
import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import { SocialTriviaApp } from './SocialTriviaApp'
import HostBar from '../components/HostBar/hostBar'
import sinon from 'sinon'

describe('Given `SocialTriviaApp`' ,() => {
    let sandbox, fetchAnswersFromDBSpy

    function requiredProps(overrides= {}) {
        return {
            fetchAnswersFromDB: fetchAnswersFromDBSpy,
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<SocialTriviaApp {...props}/>)

    }
    
    beforeEach(() => {

        sandbox = sinon.createSandbox(),
        fetchAnswersFromDBSpy = sandbox.spy()
    })
    
    afterEach(() => {
    
        sandbox.restore()
    })

    it('it should exist as a `main` tag', () => {

        const component = renderComponent()
        
        expect(component.type()).to.equal('main')

    })

    it('should contain a `HostBar` component', () => {

        const component = renderComponent()

        expect(component.find('HostBar').exists()).to.be.true()
    })

    it('should contain a `Teams` component', () => {

        const component = renderComponent()

        expect(component.find('Teams').exists()).to.be.true()
    })
})
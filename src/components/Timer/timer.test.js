import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import Timer from './Timer'

describe('Given `Timer`' ,() => {

    let component

    const mockCurrentTimeText = '60';
    
    function requiredProps(overrides= {}) {
        return {
            currentTime: mockCurrentTimeText,
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {
        const newProps = requiredProps(props)
        return shallow(<Timer {...newProps}/>)
    }

    beforeEach(() => {
        component = renderComponent()
    })
    
    it('it should exist as a `section` tag', () => {
        
        expect(component.type()).to.equal('section')

    })

    it('should contain a `.current-time` which contains a currentTime', () => {

        expect(component.find('.current-time').text()).to.equal(mockCurrentTimeText)

    })

    it('should contain a `.start-timer-button`', () => {

        expect(component.find('.start-timer-button').type()).to.equal('button')

    })

    describe('Given `.start-timer-button', () => {

        describe('when the timer is running', () => {
            
            it('should be disabled', () => {

                component = renderComponent({ isTimerRunning: true })               

                expect(component.find('.start-timer-button').props().disabled).to.be.true()

            })

        })

        describe('when the timer is stopped', () => {
            
            it('should be enabled', () => {

                component = renderComponent({ isTimerRunning: false })

                expect(component.find('.start-timer-button').props().disabled).to.be.false()

            })

        })

    })

    it('should contain a `.pause-timer-button`', () => {

        expect(component.find('.pause-timer-button').type()).to.equal('button')

    })

    it('should contain a `.reset-timer-button`', () => {

        expect(component.find('.reset-timer-button').type()).to.equal('button')

    })
})
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Timer from './Timer'

describe('Given `Timer`' ,() => {

    let component,
        sandbox,
        startTimerSpy,
        pauseTimerSpy,
        resetTimerSpy


    const currentTimeText = '60';

    const initialProps = {
        currentTime: currentTimeText,
        startTimer: startTimerSpy,
        pauseTimer: pauseTimerSpy,
        resetTimer: resetTimerSpy
    }
    
    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {
        const newProps = requiredProps(props)
        return shallow(<Timer {...newProps}/>)
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        startTimerSpy = sandbox.spy()
        pauseTimerSpy = sandbox.spy()
        resetTimerSpy = sandbox.spy()
        component = renderComponent(initialProps)
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

        describe('when the timer is stopped', () => {
            
            it('should be enabled', () => {

                component = renderComponent({ isTimerRunning: false })

                expect(component.find('.start-timer-button').props().disabled).to.be.false()

            })

        })

        describe('when `.start-timer-button` is clicked', () => {

            it('should call `startTimer`', () => {

                component.find('.start-timer-button').simulate('click')

                sinon.assert.calledOnce(startTimerSpy)

            })

            describe('when the timer is running', () => {
            
                it('should be disabled', () => {
    
                    component = renderComponent({ isTimerRunning: true })               
    
                    expect(component.find('.start-timer-button').props().disabled).to.be.true()
    
                })
    
            })

        })

    })

    it('should contain a `.pause-timer-button`', () => {

        expect(component.find('.pause-timer-button').type()).to.equal('button')

    })

    describe('Given `.pause-timer-button', () => {

        describe('when the timer is running', () => {
            
            it('should be enabled', () => {

                component = renderComponent({ isTimerRunning: true })               

                expect(component.find('.pause-timer-button').props().disabled).to.be.false()

            })

        })

        describe('when the timer is stopped', () => {
            
            it('should be disabled', () => {

                component = renderComponent({ isTimerRunning: false })

                expect(component.find('.pause-timer-button').props().disabled).to.be.true()

            })

        })

    })

    it('should contain a `.reset-timer-button`', () => {

        expect(component.find('.reset-timer-button').type()).to.equal('button')

    })
})
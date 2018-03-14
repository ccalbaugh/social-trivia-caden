import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { Timer } from './Timer'

describe('Given `Timer`' ,() => {

    let component,
        sandbox,
        controlTimerSpy,
        resetTimerSpy,
        updateTimerSpy


    const currentTimeText = '60';

    const initialProps = {
        currentTime: currentTimeText,
        controlTimer: controlTimerSpy,
        resetTimer: resetTimerSpy,
        isTimerRunning: false
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
        controlTimerSpy = sandbox.spy()
        resetTimerSpy = sandbox.spy()
        updateTimerSpy = sandbox.spy()
        component = renderComponent(initialProps)
    })

    afterEach(() => {
        sandbox.restore()
    })
    
    it('it should exist as a `section` tag', () => {
        
        expect(component.type()).to.equal('section')

    })

    it('should contain a `.timer` input which contains a currentTime', () => {

        expect(component.find('.timer').props().value).to.equal(currentTimeText)

    })

    describe('Given `.timer`', () => {

        describe('When it is updated', () => {

            beforeEach(() => {
                component = renderComponent({ updateTimer: updateTimerSpy })
                component.find('.timer').simulate('change', { target: { value: '40' } })
            })

            it('should dispatch `updateTimer`', () => {

                sinon.assert.calledOnce(updateTimerSpy)

            })

        })

    })

    it('should contain a `.control-timer-button`', () => {

        expect(component.find('.control-timer-button').type()).to.equal('button')

    })

    describe('Given `.control-timer-button', () => {

        describe('when the timer is stopped', () => {
            
            it('should contain the text `Start`', () => {

                expect(component.find('.control-timer-button').text()).to.equal('Start')

            })

            describe('When the button is clicked', () => {

                it('should call controlTimer to update the state', () => {

                    component = renderComponent({ controlTimer: controlTimerSpy })

                    component.find('.control-timer-button').simulate('click')
    
                    sinon.assert.calledOnce(controlTimerSpy)
                
                })

            })

        })

        describe('when the timer is started', () => {

            beforeEach(() => {
                component = renderComponent({ isTimerRunning: true })
            })
            
            it('should contain the text `Pause`', () => {

                expect(component.find('.control-timer-button').text()).to.equal('Pause')

            })

            describe('When the button is clicked', () => {

                it('should call controlTimer to update the state', () => {

                    component = renderComponent({ controlTimer: controlTimerSpy })

                    component.find('.control-timer-button').simulate('click')
    
                    sinon.assert.calledOnce(controlTimerSpy)
                
                })

            })

        })

    })

    it('should contain a `.reset-timer-button`', () => {

        expect(component.find('.reset-timer-button').type()).to.equal('button')

    })
})
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { AnswerForm } from './AnswerForm'

describe('Given `AnswerForm`' ,() => {
    let sandbox

    function requiredProps(overrides= {}) {
        return {
            ...overrides
        }
    }

    function renderComponent(props=requiredProps()) {

        return shallow(<AnswerForm {...props}/>)

    }
    
    beforeEach(() => {

        sandbox = sinon.createSandbox()
    })
    
    afterEach(() => {
    
        sandbox.restore()
    })

    it('it should contain a `div` tag', () => {

        const component = renderComponent()
       
        expect(component.find('.form').type()).to.equal('div') 
           
    })

    it('it should contain a `Formik` form', () => {

        const component = renderComponent()
        
        expect(component.find('Formik').length).to.equal(1) 

    })

    describe('Given `Formik` form',() => {

        it('it should contain a `form`', () => {

            const component = renderComponent()
            const form = component.find('Formik').dive().find('form')
          
            expect(form.length).to.equal(1) 
    
        })

        it('it should contain a `input` and a `button` inside the form', () => {

            const component = renderComponent()
            const input = component.find('Formik').dive().find('.answer-input')
            const button = component.find('Formik').dive().find('.answer-submit-btn')

            expect(input.length).to.equal(1)
            expect(button.length).to.equal(1)
                    
        })           
        
        it('it should start with initial values', () => {
            
            const component = renderComponent()
            const formikForm = component.find('Formik')

            expect(formikForm.props().initialValues.answer).to.equal('')
            expect(formikForm.props().initialValues.id).to.equal(0)
    
        })
    })
})
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import AnswerForm from './AnswerForm'

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

    it('it should contain a `Formik`', () => {

        const component = renderComponent()
        
        expect(component.find('Formik').exists()).to.be.true()

    })

    describe('Given `Formik`',() => {

        it('it should contain a `FormDisplay`', () => {

            const component = renderComponent()
            
            expect(component.find('Formik').dive().find('FormDisplay').exists()).to.be.true()
    
        })

        describe('Given `FormDisplay`', () => {

            it('it should contain a `section` tag', () => {

                const component = renderComponent()
                
                expect(component.find('Formik').dive().find('FormDisplay').dive().find('section').exists()).to.be.true()
        
            })

            it('it should contain a `Form`', () => {

                const component = renderComponent()
                
                expect(component.find('Formik').dive().find('FormDisplay').dive().find('Form').exists()).to.be.true()
        
            })

            // describe('Given `Form`', () => {

            //     it('it should contain a `div` tag with a specific class name', () => {

            //         const component = renderComponent({handleSubmit: sandbox.spy()})
            //         console.log('TEST',component.find('Formik').dive().find('FormDisplay').dive().find('Form').dive().find('form').find('.answer-input-container'))
            //         //expect(component.find('Formik').dive().find('FormDisplay').dive().find('Form').find('.answer-input-container').length).to.equal(1)
            
            //     })

            //     // it('it should contain a `Field` and a `button`', () => {
    
            //     //     const component = renderComponent()
                    
            //     //     expect(component.find('Formik').dive().find('FormDisplay').dive().find('Form').find('Field').exists()).to.be.true()
            //     //     expect(component.find('Formik').dive().find('FormDisplay').dive().find('Form').find('button').exists()).to.be.true()
            
            //     // })
            // })
        })        
    })
})
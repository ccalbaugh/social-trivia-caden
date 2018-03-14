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

    it('it should contain a `Formik` form', () => {

        const component = renderComponent()
        
        expect(component.find('Formik').length).to.equal(1) 

    })

    describe('Given `Formik` form',() => {

        it('it should contain a `FormDisplay`', () => {

            const component = renderComponent()
            
            expect(component.dive().find('FormDisplay').exists()).to.be.true()

        })

        describe('Given `FormDisplay`', () => {

            it('it should contain a `section` tag', () => {

                const component = renderComponent()
                const section = component.dive().find('FormDisplay').dive().find('section')
               
                expect(section.length).to.equal(1) 
                   
            })

            it('it should contain a `Form`', () => {

                const component = renderComponent()
                const form = component.dive().find('FormDisplay').dive().find('section').find('Form').find('Form')

                expect(form.length).to.equal(1) 

            })

            describe('Given `Form`', () => {
                let component, form 

                beforeEach(() => {

                    component = renderComponent()

                    form = component.dive().find('FormDisplay').dive().find('section').find('Form').find('Form')

                })

                it('it should contain a `div` tag with a specific class name', () => {

                    expect(form.find('.answer-input-container').length).to.equal(1)  

                })

                it('it should contain a `Field` and a `button`', () => {
                    
                    expect(form.find('.answer-input').length).to.equal(1)
                    expect(form.find('.answer-submit-btn').length).to.equal(1)
                
                })

                describe('When the form encounters errors', () => {

                     it('it should contain a `p` tag for error message', () => {

                        const component = renderComponent({
                            isVaild: false
                        })

                        const form = component.dive().find('FormDisplay').dive().find('section').find('Form').find('Form')

                        expect(form.find('.answer-input-errors').length).to.equal(1) 
                        
                    })
                })
            })
        })        
    })
})
import React from 'react'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

const FormDisplay = ({
  values,
  errors,
  touched,
  isSubmitting,
  isValid
}) => (
    <section>       
        <Form>
        <div className='answer-input-container'>
        { !isValid && <p className='answer-input-errors'>{errors.answer}</p> }
        <Field className='answer-input' name="answer" placeholder="input answer" value={values.answer}/> 
        </div>
         <button type="submit" className='answer-submit-btn' disabled={isSubmitting}>Submit</button>
        </Form>     
    </section>
)

const AnswerForm = withFormik({
  mapPropsToValues({ answer }) {
    return {
      answer: answer || ''
    }
  },
  validationSchema: Yup.object().shape({
    answer: Yup.string().required('Answer is required.')
  }),
  handleSubmit(values, { resetForm, setSubmitting }) {
    setTimeout(() => {
        resetForm()
        setSubmitting(false)
      }, 2000)
  },
  displayName: 'Answer Form'
})(FormDisplay)

export default AnswerForm

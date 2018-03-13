import React from 'react'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

const FormDisplay = ({
  values,
  errors,
  touched,
  isSubmitting
}) => (
    <section>
        <Form>
        {/* <div className='answer-input-container'>
        { touched.answer && errors.answer && <p>{errors.answer}</p> }
        <Field name="answer" placeholder="input answer"/>
        </div>
        <button disabled={isSubmitting}>Submit</button> */}
        </Form>     
    </section>
)

const AnswerForm = withFormik({
//   mapPropsToValues({ answer }) {
//     return {
//       answer: answer || ''
//     }
//   },
//   validationSchema: Yup.object().shape({
//     answer: Yup.string().required('Answer is required.')
//   }),
  handleSubmit(values, { resetForm, setSubmitting }) {
    // setTimeout(() => {
    //     resetForm()
    //     setSubmitting(false)
    //   }, 2000)
  },
  //displayName: 'Answer Form'
})(FormDisplay)

export default AnswerForm

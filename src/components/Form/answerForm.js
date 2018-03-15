import React, { Component } from 'react'
import { Formik } from 'formik'
import { connect } from "react-redux"
import { submitAnswer } from '../../actions/answers'
import PropTypes from 'prop-types'

export class AnswerForm extends Component {
  render() {
    const { submitAnswer, id } = this.props;
    return (
      <div className="form">
        <Formik
          initialValues={{
            answer: "",
            id
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const { answer, id } = values
            submitAnswer(answer, id)
            setSubmitting(false)
            resetForm()
          }}
          render={({
            values,
            dirty,
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur
           }) => (
            <form id={id} onSubmit={handleSubmit}>
              <input
                type="text"
                name="answer"
                className='answer-input'
                placeholder="input answer"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.answer}
              />
              <button
                type="submit"
                className='answer-submit-btn'
                disabled={isSubmitting || !dirty}
              >
                Submit
              </button>
            </form>
          )}
        />
      </div>
    )
  }
}

AnswerForm.propTypes = {
  answer: PropTypes.string,
  id: PropTypes.string
}

function mapStateToProps(state) {
  return {
      answer: state.answers.answer,
      id: state.answers.id
  };
}

export default connect(mapStateToProps, { submitAnswer })(AnswerForm);

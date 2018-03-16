import React, { Component } from 'react'
import { Formik } from 'formik'
import { connect } from "react-redux"
import { submitAnswer } from '../../actions/answers'
import PropTypes from 'prop-types'

export class AnswerForm extends Component {
  render() {
    const { submitAnswer, id, name } = this.props;
    return (
      <div className="form">
        <span className="team-name">{name}</span>
        <Formik
          initialValues={{
            answer: "",
            id
          }}
          validate={(values) => {
            let errors = {};
            if (!parseInt(values.answer, 10)) {
              errors.answer = "Please enter a Number";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const { answer, id } = values
            const now = Date.now()
            submitAnswer(answer, id, now)
            setSubmitting(false)
            resetForm()
          }}
          render={({
            values,
            errors,
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
                disabled={isSubmitting || !dirty || errors.answer}
              >
                Submit
              </button>
              {errors.answer && dirty && <span>{errors.answer}</span>}              
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
      answer: state.teams.answer
  };
}

export default connect(mapStateToProps, { submitAnswer })(AnswerForm);

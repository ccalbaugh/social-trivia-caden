import React, { Component } from 'react'
import { Formik } from 'formik'
import { connect } from "react-redux"
import { submitAnswerToDB } from '../../actions/teams'
import PropTypes from 'prop-types'
import './answer-form.css';

export class AnswerForm extends Component {
  render() {

    const { submitAnswerToDB, id, name, currentTime, teams } = this.props;
    const isSubmitted = teams && Object.keys(teams).length > 0 ? teams[id].isSubmitted : false;
   
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
            let regEx = /^\d*[.]?\d*$/
            let isValidAnswer = regEx.test(values.answer)
           
            if (!isValidAnswer || !parseFloat(values.answer)) {
              errors.answer = "Please enter a Number";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const { answer, id } = values
            const now = Date.now()
            submitAnswerToDB(parseFloat(answer), id, now, true)           
            setSubmitting(false)
            resetForm()
          }}
          render={({
            values,
            errors,
            dirty,
            handleSubmit,
            handleChange,
            handleBlur
           }) => (             
            <form id={id} onSubmit={handleSubmit}>
              <input
                type="text"
                name="answer"
                className='answer-input'
                placeholder="Your answer"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.answer}
              />
              <button
                type="submit"
                className='answer-submit-btn'
                disabled={!dirty || errors.answer || (currentTime <= 0 && id !== 'admin') || (isSubmitted && id !== 'admin')}
              >
                Submit
              </button>
              {errors.answer && dirty && <span>{errors.answer}</span>}              
            </form>
          )}
        />
        { isSubmitted && id !== 'admin' ? (
          <span className="is-submitted">Submitted!</span>
        ) : (
          (currentTime === 0 && id !== 'admin') &&
          <span className="out-of-time">Out of Time!</span>
        )}
      </div>
    )
  }
}

AnswerForm.propTypes = {
  answer: PropTypes.string,
  id: PropTypes.string,
  currentTime: PropTypes.number
}

function mapStateToProps(state) {
  return {
      teams: state.teams,
      currentTime: state.timer.currentTime
  };
}

export default connect(mapStateToProps, { submitAnswerToDB })(AnswerForm);

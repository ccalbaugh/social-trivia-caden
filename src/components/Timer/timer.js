import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    controlTimer, 
    resetTimer, 
    updateTimer, 
    decrementTimer 
} from '../../actions/timer'

function handleControlTimer(isTimerRunning) {
    this.props.controlTimer(isTimerRunning)
}

function handleTimerUpdate(e) { 
    const currentTime = parseInt(e.target.value, 10)
    this.props.updateTimer(currentTime)
}

export class Timer extends Component {

    state = {
        currentTime: this.props.currentTime
    }

    render() {
        const { currentTime, isTimerRunning, defaultTime } = this.props
        return (
            <section className="timer">
                <input className="current-time"
                       value={this.state.currentTime}
                       onChange={handleTimerUpdate.bind(this)}       
                />
                <button className="start-timer-button" 
                        disabled={isTimerRunning}
                        onClick={() => handleControlTimer.call(this, isTimerRunning)}
                >
                    Start
                </button>
                <button className="pause-timer-button" 
                        disabled={!isTimerRunning}
                        onClick={() => handleControlTimer.call(this, isTimerRunning)}
                >
                    Pause
                </button>
                <button className="reset-timer-button">Reset</button>             
            </section>
        )
    }
}

Timer.propTypes = {
    currentTime: PropTypes.number,
    isTimerRunning: PropTypes.boolean,
    defaultTime: PropTypes.number
}

Timer.defaultProps = {
    currentTime: 60
}

function mapStateToProps(state) {
    return {
        currentTime: state.currentTime,
        isTimerRunning: state.isTimerRunning,
        defaultTime: state.defaultTime
    };
}

export default connect(mapStateToProps, { controlTimer, resetTimer, updateTimer, decrementTimer })(Timer)
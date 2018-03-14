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
    const currentTime = parseInt(e.target.value, 10) || 0
    this.props.updateTimer(currentTime)
}

function handleTimerReset() {
    this.props.resetTimer(this.props.defaultTime)
}

export class Timer extends Component {

    state = {
        currentTime: this.props.currentTime 
    }

    componentWillReceiveProps(nextProps) {
        nextProps.currentTime !== this.props.currentTime &&
        this.setState({ currentTime: nextProps.currentTime })
    }

    render() {
        const { currentTime, isTimerRunning, defaultTime } = this.props
        return (
            <section className="timer-container">
                <input className="timer"
                       value={this.state.currentTime}
                       onChange={handleTimerUpdate.bind(this)}       
                />
                <button className="control-timer-button"
                        onClick={() => handleControlTimer.call(this, !isTimerRunning)}
                >
                    { isTimerRunning ? 'Pause' : 'Start' }
                </button>
                <button className="reset-timer-button"
                        onClick={handleTimerReset.bind(this)}
                >
                    Reset
                </button>             
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
        currentTime: state.timer.currentTime,
        isTimerRunning: state.timer.isTimerRunning,
        defaultTime: state.timer.defaultTime
    };
}

export default connect(mapStateToProps, { controlTimer, resetTimer, updateTimer, decrementTimer })(Timer)
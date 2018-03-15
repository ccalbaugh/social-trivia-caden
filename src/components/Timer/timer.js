import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    controlTimer, 
    resetTimer, 
    updateTimer, 
    decrementTimer 
} from '../../actions/timer'

const TIMER_TICK = 1000

function handleControlTimer(isTimerRunning) {

    this.props.controlTimer(isTimerRunning)

    if (isTimerRunning) {
        const intervalId = setInterval(() => this.props.decrementTimer(this.props.currentTime), TIMER_TICK)
        this.setState({ intervalId })
    } else if (this.state.intervalId) {
        clearInterval(this.state.intervalId)
        this.setState({ intervalId: undefined })
    }
}

function handleTimerUpdate(e) { 
    const currentTime = parseInt(e.target.value, 10) || 0
    this.props.updateTimer(currentTime)
}

function handleTimerReset() {
    this.props.resetTimer(this.props.defaultTime)
    this.state.intervalId && 
        clearInterval(this.state.intervalId) & 
        this.setState({ intervalId: undefined })
}

export class Timer extends Component {

    state = {
        currentTime: this.props.currentTime || 0
    }

    componentWillReceiveProps(nextProps) {
        nextProps.currentTime !== this.props.currentTime &&
        this.setState({ currentTime: nextProps.currentTime })
    }

    render() {
        const { isTimerRunning } = this.props
        return (
            <section className="timer-container">
                <input className="timer"
                       value={this.state.currentTime}
                       onChange={handleTimerUpdate.bind(this)}       
                />
                <button className="control-timer-button"
                        onClick={handleControlTimer.bind(this, !isTimerRunning)}
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
    isTimerRunning: PropTypes.bool,
    defaultTime: PropTypes.number
}

function mapStateToProps(state) {
    return {
        currentTime: state.timer.currentTime,
        isTimerRunning: state.timer.isTimerRunning,
        defaultTime: state.timer.defaultTime
    };
}

export default connect(mapStateToProps, { controlTimer, resetTimer, updateTimer, decrementTimer })(Timer)

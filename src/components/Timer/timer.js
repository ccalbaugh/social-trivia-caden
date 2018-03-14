import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    controlTimer, 
    resetTimer, 
    updateTimer, 
    decrementTimer 
} from '../../actions/timer'

function controlTimerClick(isTimerRunning) {
    controlTimer(isTimerRunning);
}

export class Timer extends Component {

    render() {
        const { currentTime, isTimerRunning, defaultTime } = this.props
        return (
            <section>
                <span className="current-time">{currentTime}</span>
                <button className="start-timer-button" 
                        disabled={isTimerRunning}
                        onClick={controlTimerClick.bind(this, isTimerRunning)}
                >Start</button>
                <button className="pause-timer-button" disabled={!isTimerRunning}>Pause</button>
                <button className="reset-timer-button">Reset</button>                                                
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentTime: state.currentTime,
        isTimerRunning: state.isTimerRunning,
        defaultTime: state.defaultTime
    };
}

export default connect(mapStateToProps, { controlTimer, resetTimer, updateTimer, decrementTimer })(Timer)
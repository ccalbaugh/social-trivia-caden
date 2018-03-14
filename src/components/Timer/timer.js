import React, { Component } from 'react'

class Timer extends Component {

    render() {
        const { currentTime, isTimerRunning } = this.props
        return (
            <section>
                <span className="current-time">{currentTime}</span>
                <button className="start-timer-button" disabled={isTimerRunning}>Start</button>
                <button className="pause-timer-button" disabled={!isTimerRunning}>Start</button>
                <button className="reset-timer-button">Start</button>                                                
            </section>
        )
    }
}

export default Timer
import React, { Component } from 'react'

class Timer extends Component {

    render() {
        const { currentTime } = this.props
        return (
            <section>
                <span className="current-time">{currentTime}</span>
                <button className="start-timer-button">Start</button>
                <button className="pause-timer-button">Start</button>
                <button className="reset-timer-button">Start</button>                                                
            </section>
        )
    }
}

export default Timer
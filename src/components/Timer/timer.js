import './timer.css';
import { PieChart, Pie, Cell } from 'recharts';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    createTimer,
    controlTimer, 
    resetTimer, 
    updateTimer, 
    decrementTimer,
    fetchTimer 
} from '../../actions/timer'
import { min } from 'moment';

const TIMER_TICK = 1000

function handleControlTimer(isTimerRunning) {

    this.props.controlTimer(isTimerRunning)

    if (isTimerRunning) {
        if (this.props.currentTime > 0) {
            const intervalId = setInterval(() => this.props.decrementTimer(this.props.currentTime), TIMER_TICK)
            this.setState({ intervalId })
        }
    } else if (this.state.intervalId) {
        clearInterval(this.state.intervalId)
        this.setState({ intervalId: undefined })
    }
}

function handleTimerUpdate(e) { 
    const value = e.target.value
    const currentTime = 
        parseInt(value, 10) || 
        parseInt(value, 10) >= 0 ? 
            parseInt(value, 10) : 
            0
    this.props.updateTimer(currentTime)
}

function handleTimerReset() {
    this.props.resetTimer(this.props.defaultTime)
    this.state.intervalId && 
        clearInterval(this.state.intervalId) && 
        this.setState({ intervalId: undefined })
}

function secToTimeCode(time){
    let pre, minutes, seconds, totalTime;

    minutes = Math.floor(time/60);
    seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    totalTime = minutes + ':' + seconds;

    return `${totalTime}`;
}

function tensionColor(num) {
    let level = '#54e8b5';
    level = num < 16 && num >= 11 ? '#ffc107' : num < 11 ? '#f44336' : level
    return level;
}

export class Timer extends Component {

    state = {
        currentTime: this.props.currentTime || 0
    }

    componentDidMount() {
        if (this.props.parentId.toLowerCase() === 'admin') {
            this.props.createTimer()  
        }

        this.props.fetchTimer()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timer !== this.props.timer) {
            nextProps.currentTime !== this.props.currentTime &&
            this.setState({ currentTime: nextProps.currentTime })
            
            nextProps.currentTime <=0 && 
            this.state.intervalId && 
            clearInterval(this.state.intervalId)
        }
    }

    render() {
        const { isTimerRunning, defaultTime } = this.props
        const { currentTime } = this.state

        const trackWidth = 8;
        const timerData = [
            {name: 'Time Used', value: currentTime},
            {name: 'Time Remaining', value: defaultTime-currentTime}
        ]

        return (
            <section className="timer-container">
                <div className={'chart-container'}>
                    <div className={'timer-label'} style={{color: tensionColor(currentTime)}}>{secToTimeCode(currentTime)}</div>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={timerData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={100-trackWidth}
                            outerRadius={100}
                            isAnimationActive={false}
                        >
                            <Cell
                                  fill={tensionColor(currentTime)}
                                  stroke={tensionColor(currentTime)}
                            />
                            <Cell
                                  fill='#a2a2a2'
                                  stroke='#a2a2a2'
                            />
                        </Pie>
                    </PieChart>
                </div>

                {
                    this.props.parentId.toLowerCase() === 'admin' &&
                    <div className="admin-timer-controls">
                        <input className="timer"
                               value={currentTime}
                               maxLength={3}
                               onChange={handleTimerUpdate.bind(this)} 
                        />
                        <button className="control-timer-button"
                                onClick={handleControlTimer.bind(this, !isTimerRunning)}
                                disabled={currentTime <= 0}
                        >
                            { isTimerRunning ? 'Pause' : 'Start' }
                        </button>
                        <button className="reset-timer-button"
                                onClick={handleTimerReset.bind(this)}
                        >
                            Reset
                        </button>  
                    </div>
                }

                           
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
        timer: state.timer,
        currentTime: state.timer.currentTime,
        isTimerRunning: state.timer.isTimerRunning,
        defaultTime: state.timer.defaultTime
    };
}

export default connect(
    mapStateToProps, { 
        createTimer, 
        controlTimer, 
        resetTimer, 
        updateTimer, 
        decrementTimer, 
        fetchTimer 
    }
)(Timer)
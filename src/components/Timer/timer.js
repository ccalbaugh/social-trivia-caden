import './timer.css';
import { PieChart, Pie, Cell } from 'recharts';
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
        clearInterval(this.state.intervalId) & 
        this.setState({ intervalId: undefined })
}

function secToTimeCode(sec){
    let pre;
    sec < 10 ? pre = '00:0': pre = '00:';
    return `${pre}${sec}`;
}

function tensionColor(num) {
    let level = '#54e8b5';
    num < 16 ? level = '#ffc107': null;
    num < 11 ? level = '#f44336': null;
    return level;
}

export class Timer extends Component {

    state = {
        currentTime: this.props.currentTime || 0
    }

    componentWillReceiveProps(nextProps) {
        nextProps.currentTime !== this.props.currentTime &&
        this.setState({ currentTime: nextProps.currentTime })

        nextProps.currentTime <=0 && 
        this.state.intervalId && 
        clearInterval(this.state.intervalId)
    }

    render() {
        const { isTimerRunning, defaultTime} = this.props
        const { currentTime } = this.state

        const colors = ['#54e8b5', '#a2a2a2'];
        const trackWidth = 8;
        const timerData = [
            {name: 'Time Used', value: currentTime},
            {name: 'Time Remaining', value: defaultTime-currentTime}
        ]

        return (
            <section className="timer-container">
                <div>
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

                <input className="timer"
                       value={currentTime}
                       maxLength={2}
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
            </section>
        )
    }
}

Timer.propTypes = {
    currentTime: PropTypes.number,
    isTimerRunning: PropTypes.bool,
    defaultTime: PropTypes.number
}
Timer.defaultProps = {
    currentTime: 30,
    defaultTime: 30
}
function mapStateToProps(state) {
    return {
        currentTime: state.timer.currentTime,
        isTimerRunning: state.timer.isTimerRunning,
        defaultTime: state.timer.defaultTime
    };
}

export default connect(mapStateToProps, { controlTimer, resetTimer, updateTimer, decrementTimer })(Timer)
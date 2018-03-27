import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTeamsFromDB, fetchIsShowingAnswers } from '../../actions/teams'
import Timer from '../Timer/timer'
import './teams.css';

export class Teams extends Component {

    state = {
        teams: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.teams !== this.props.teams) {
            this.setState({ 
                teams: Object.keys(nextProps.teams)
                    .filter(team => team.toLowerCase() !== 'admin')
                    .map((team, i) => {
                    return {
                        ...nextProps.teams[team],
                        id: team
                    }
                })
            })
        }
    }

    componentDidMount() {
        this.props.fetchTeamsFromDB()
        this.props.fetchIsShowingAnswers()
    }

    render() {
        const { teams } = this.state
        const { isShowingAnswers } = this.props
        return (
            <section className="teams-view">
                <Timer parentId="teams" />
                { (isShowingAnswers && this.props.teams['admin'].answer) && <span className="team-answer correct-answer">{`Correct Answer: ${this.props.teams['admin'].answer}`}</span> }
                <ul className="team-list">
                    {
                        (!!teams && !!teams.length) ? (
                            teams.map((team) => {
                                const submitted = team.isSubmitted ? 'submitted' : '';
                                return (
                                    <li className={`team-list-item ${submitted}`} 
                                        key={team.id}
                                    >
                                        <div className={'team-name'}>{team.id}</div>

                                        <div className={'label-group team-answer-group'}>
                                            <label>Team Answer</label>
                                            <span className="team-answer">
                                                {
                                                    (isShowingAnswers && team.answer) && (`${team.answer}`)
                                                }
                                            </span>
                                        </div>
                                        <div className={'label-group team-score-group'}>
                                            <label>Score</label>
                                            <span className="team-score">{team.score || 0}</span>
                                        </div>
                                    </li>
                                )
                            })
                        ) :
                        <li>No Teams</li>
                    }
                </ul>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams,
        timer: state.timer,
        isShowingAnswers: state.isShowingAnswers
    }
}

export default connect(mapStateToProps, { fetchTeamsFromDB, fetchIsShowingAnswers })(Teams)
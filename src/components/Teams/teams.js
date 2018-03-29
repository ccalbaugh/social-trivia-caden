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

            const teamsKeys = Object.keys(nextProps.teams).filter(teamKey => teamKey.toLowerCase() !== 'admin');
            const initialState = !teamsKeys.filter(teamKey => !!nextProps.teams[teamKey].isSubmitted).length;

            if (initialState) {

                const sortedByScore = teamsKeys
                    .map(id => ({ ...nextProps.teams[id], id, answeredFirst: false }))
                    .sort((a, b) => b.score - a.score);

                this.setState({ teams: sortedByScore })

            } else {

                const firstAnsweredStamp = Math.min(...teamsKeys.filter(teamKey => nextProps.teams[teamKey].answeredAt).map(key => nextProps.teams[key].answeredAt));
                const sortedWithTimestamp = teamsKeys
                    .filter(teamKey => nextProps.teams[teamKey].answeredAt !== 0)
                    .map(id => ({
                        ...nextProps.teams[id],
                        id,
                        answeredFirst: nextProps.teams[id].answeredAt === firstAnsweredStamp
                    }))
                    .sort((a, b) => a.answeredAt - b.answeredAt);

                const noTimestamps = teamsKeys
                    .filter(teamKey => nextProps.teams[teamKey].answeredAt === 0)
                    .map(id => ({ ...nextProps.teams[id], id, answeredFirst: false }));
                const fullySorted = [ ...sortedWithTimestamp, ...noTimestamps ];
                this.setState({ teams: fullySorted })
            }
        }
    }

    componentDidMount() {
        this.props.fetchTeamsFromDB()
        this.props.fetchIsShowingAnswers()
    }

    render() {
        const { teams } = this.state
        const { isShowingAnswers, parentId } = this.props
        return (
            <section className="teams-view">
                { (!parentId || parentId !== 'admin') && 
                    <Timer parentId="teams" />
                }
                { (isShowingAnswers && this.props.teams['admin'].answer) && <span className="team-answer correct-answer">{`Correct Answer: ${this.props.teams['admin'].answer}`}</span> }
                <ul className="team-list">
                    {
                        (!!teams && !!teams.length) ? (
                            teams.map((team) => {
                                const submitted = team.isSubmitted ? 'submitted' : '';
                                const answeredFirst = team.answeredFirst ? 'answered-first' : '';
                                return (
                                    <li className={`team-list-item ${submitted} ${answeredFirst}`} 
                                        key={team.id}
                                    >
                                        <div className={'team-name'}>{team.id}</div>

                                        <div className={'label-group team-answer-group'}>
                                            <label>Team Answer: </label>
                                            <span className="team-answer">
                                                {
                                                    (isShowingAnswers && team.answer) && (`${team.answer}`)
                                                }
                                            </span>
                                        </div>
                                        <div className={'label-group team-score-group'}>
                                            <label>Score: </label>
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
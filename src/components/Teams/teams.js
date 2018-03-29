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
                    .filter(teamKey => teamKey.toLowerCase() !== 'admin')
                    .sort((a, b) => nextProps.teams[b].score - nextProps.teams[a].score)
                    .map(id => ({ ...nextProps.teams[id], id }));
                this.setState({ teams: sortedByScore })
            } else {
                const firstAnsweredStamp = Math.min(...teamsKeys.filter(teamKey => nextProps.teams[teamKey].answeredAt).map(key => nextProps.teams[key].answeredAt));
                const sortedByTimestamp = 
                      teamsKeys
                            .filter(teamKey => teamKey.toLowerCase() !== 'admin')
                            .map((teamId, i) => {
                                return {
                                    ...nextProps.teams[teamId],
                                    id: teamId,
                                    answeredFirst: nextProps.teams[teamId].answeredAt === firstAnsweredStamp
                                }
                            })
                            .sort((a, b) => {
                                return (a.answeredAt === 0) ?
                                        1 :
                                        (b.answeredAt === 0) ?
                                            -1 : 
                                                a.answeredAt > b.answeredAt ?
                                                1 : 
                                                    a.answeredAt < b.answeredAt ?
                                                    -1 :
                                                        0
                            })
                this.setState({ teams: sortedByTimestamp })
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
                                console.log("AnsweredFirst: ", answeredFirst);
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
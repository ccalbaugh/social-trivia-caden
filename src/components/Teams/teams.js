import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timer from '../Timer/timer'
import AnswerForm from '../Form/answerForm'

export class Teams extends Component {

    state = {
        teams: [
            { name: 'Team 1', id: 'team-1', score: 0 },
            { name: 'Team 2', id: 'team-2', score: 0 },
            { name: 'Team 3', id: 'team-3', score: 0 },
            { name: 'Team 4', id: 'team-4', score: 0 },
            { name: 'Team 5', id: 'team-5', score: 0 },
            { name: 'Team 6', id: 'team-6', score: 0 } 
        ]
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.teams !== this.props.teams) {
            this.setState({ 
                teams: this.state.teams.map((team, i) => {
                    if (nextProps.teams[team.id]) {
                        return {
                            ...team,
                            score: nextProps.teams[team.id].score
                        }
                    } else {
                        return team
                    }
                })
            })
        }
    }

    render() {
        return (
            <section>
                <Timer parentId="teams" />
                <ul className="team-list">
                    {
                        this.state.teams.map((team) => {
                            return (
                                <li className="team-list-item" 
                                    key={team.id}
                                >
                                    <AnswerForm id={team.id} name={team.name} />
                                    <span className="team-score">Team Score: {team.score || 0}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams
    }
}

export default connect(mapStateToProps)(Teams)
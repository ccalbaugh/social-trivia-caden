import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTeamsFromDB } from '../../actions/teams'
import Timer from '../Timer/timer'

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
    }

    render() {
        const { teams } = this.state
        return (
            <section>
                <Timer parentId="teams" />
                <ul className="team-list">
                    {
                        teams.length ? (
                            teams.map((team) => {
                                return (
                                    <li className="team-list-item" 
                                        key={team.id}
                                    >
                                        <span className="team-name">Team Name: {team.id}  ||  </span>
                                        <span className="team-answer">Team Answer: {team.answer}  ||  </span>                                        
                                        <span className="team-score">Team Score: {team.score || 0}</span>
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
        timer: state.timer
    }
}

export default connect(mapStateToProps, { fetchTeamsFromDB })(Teams)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeamInDB, fetchTeamsFromDB } from '../../actions/teams';
import {
    Redirect,
    withRouter
} from "react-router-dom";

function handleChange(e) {
    const currentInput = e.target.value
    this.setState({ currentInput })
}

function handleSubmit(e) {
    e.preventDefault()
    const teamId = this.state.currentInput

    if (teamId) {
        (teamId.toLowerCase() !== 'admin' && this.props.teams[teamId]) ? (
            this.setState({ currentInput: '', teamId, teamExists: true })
        ) : (
            this.setState(
                { currentInput: '', teamId, redirectToReferrer: true }, 
                () => { this.props.createTeamInDB(teamId, Date.now()) }
            )
        )
    }
}

export class CreateTeam extends Component {

    state = {
        currentInput: '',
        redirectToReferrer: false,
        teamId: '',
        teamExists: false
    }

    componentDidMount() {
        this.props.fetchTeamsFromDB()
    }

    render() {

        const { redirectToReferrer, currentInput, teamId } = this.state
        const path = teamId.toLowerCase() === 'admin' ? 
            '/admin' : 
            teamId.toLowerCase() === 'teams' ?
                    '/teams' :
                        `/team/${teamId}`

        if (redirectToReferrer) {
            return <Redirect to={path} />
        }

        const { teamExists } = this.state

        return (
            <form className="create-team"
                  
                  onSubmit={handleSubmit.bind(this)}
            >
                <input type="text" 
                       className="create-team-input" 
                       value={currentInput} 
                       onChange={handleChange.bind(this)} 
                />
                <button className="creat-team-button"
                        disabled={!currentInput}
                >
                    Create Team
                </button>
                { teamExists && <span className="team-taken">Team is taken, please enter another</span> }
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams
    }
}

export default withRouter(connect(mapStateToProps, { createTeamInDB, fetchTeamsFromDB })(CreateTeam));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeamInDB } from '../../actions/teams';
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
        this.setState(
            { currentInput: '', teamId }, 
            () => { this.props.createTeamInDB(teamId, Date.now()) }
        )
    }
}

export class CreateTeam extends Component {

    state = {
        currentInput: '',
        redirectToReferrer: false,
        teamId: ''
    }

    componentWillReceiveProps(nextProps) {
        nextProps.teams &&
        nextProps.teams[this.state.teamId] &&
        this.setState({ redirectToReferrer: true })
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
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams
    }
}

export default withRouter(connect(mapStateToProps, { createTeamInDB })(CreateTeam));
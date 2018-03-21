import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeamInDB } from '../../actions/teams';

function handleChange(e) {
    const currentInput = e.target.value
    this.setState({ currentInput })
}

function handleSubmit() {
    this.props.createTeamInDB(this.state.currentInput)
}

export class CreateTeam extends Component {

    state = {
        currentInput: ''
    }

    render() {
        return (
            <form className="create-team"
                  
                  onSubmit={handleSubmit.bind(this)}
            >
                <input type="text" 
                       className="create-team-input" 
                       value={this.state.currentInput} 
                       onChange={handleChange.bind(this)} 
                />
                <button className="creat-team-button"
                        disabled={!this.state.currentInput}
                >
                    Create Team
                </button>
            </form>
        );
    }
}

export default connect(null, { createTeamInDB })(CreateTeam);
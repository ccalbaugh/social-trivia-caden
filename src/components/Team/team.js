import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnswerForm from '../Form/answerForm';
import { fetchTimer } from '../../actions/timer';
import { fetchTeamsFromDB } from '../../actions/teams';
import { connect } from 'react-redux';

export class Team extends Component {

    componentDidMount() {
        this.props.fetchTimer()
        this.props.fetchTeamsFromDB()
    }

    render() {
        
        const { id } = this.props.match.params;
        const { teams } = this.props;
        const matchingTeam = Object.keys(teams).find(team => team === id)
        const teamExists = teams && !!matchingTeam; 

        return (
            <section className="team">
                {
                    teamExists & teamExists ? (
                        <AnswerForm id={id} name={id} />
                    ) : (
                        <React.Fragment>
                            <span className="no-team">Team not Found</span>
                            <hr/>
                            <Link to="/" className="button">Create a Team Here</Link>
                        </React.Fragment>
                    )
                }
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

export default connect(mapStateToProps, { fetchTimer, fetchTeamsFromDB })(Team);

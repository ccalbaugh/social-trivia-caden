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
        
        const { id } = this.props.match.params
        const teamExists = this.props.teams && Object.keys(this.props.teams).find(team => team === id);

        return (
            <section className="team">
                {
                    (teamExists && teamExists.length) ? (
                        <AnswerForm id={id} name={id} />
                    ) : (
                        <React.Fragment>
                            <span className="not-found">Team not Found</span>
                            <Link to="/">Go to Create Team Page</Link>
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

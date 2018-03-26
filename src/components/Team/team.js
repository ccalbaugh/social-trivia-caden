import React, { Component } from 'react';
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

        return (
            <section className="team">
                <AnswerForm id={id} name={id} />
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

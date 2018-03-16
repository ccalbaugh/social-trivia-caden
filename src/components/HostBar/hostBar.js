import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateTeam } from '../../actions/teams'
import AnswerForm from '../Form/answerForm'
import Timer from '../Timer/timer'

class HostBar extends Component {

    state = {
        teams: [
            { name: 'Admin', id: 'admin'}
        ]
    }

    render() {
        return (
            <section>
                 <AnswerForm id={this.state.teams[0].id}/>
                 <Timer/>
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

export default connect(mapStateToProps, { updateTeam })(HostBar);

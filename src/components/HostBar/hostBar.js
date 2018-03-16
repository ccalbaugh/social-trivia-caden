import React, { Component } from 'react'
import { connect } from "react-redux"
import AnswerForm from '../Form/answerForm'
import Timer from '../Timer/timer'

export class HostBar extends Component {

    state = {
        teams: [
            { name: 'Admin', id: 'admin'}
        ]
    }

    render() {
        return (
            <section>
                 <AnswerForm id={this.state.teams.id}/>
                 <Timer/>
            </section>
        )
    }
}

export default HostBar;

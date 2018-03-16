import React, { Component } from 'react'
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

export default HostBar;

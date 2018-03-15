import React, { Component } from 'react'
import AnswerForm from '../Form/answerForm'

class Teams extends Component {

    state = {
        teams: [
            { id: 'team-1' },
            { id: 'team-2' },
            { id: 'team-3' },
            { id: 'team-4' },
            { id: 'team-5' },
            { id: 'team-6' } 
        ]
    }

    render() {
        return (
            <section>
                <ul className="team-list">
                    {
                        this.state.teams.map((team) => {
                            return <li className="team-list-item" key={team.id}><AnswerForm id={team.id} /></li>
                        })
                    }
                </ul>
            </section>
        )
    }
}

export default Teams
import React, { Component } from 'react'
import AnswerForm from '../Form/answerForm'

class Teams extends Component {

    state = {
        teams: [
            { name: 'Team 1', id: 'team-1' },
            { name: 'Team 2', id: 'team-2' },
            { name: 'Team 3', id: 'team-3' },
            { name: 'Team 4', id: 'team-4' },
            { name: 'Team 5', id: 'team-5' },
            { name: 'Team 6', id: 'team-6' } 
        ]
    }

    render() {
        return (
            <section>
                <ul className="team-list">
                    {
                        this.state.teams.map((team) => {
                            return <li className="team-list-item" key={team.id}><AnswerForm id={team.id} name={team.name} /></li>
                        })
                    }
                </ul>
            </section>
        )
    }
}

export default Teams
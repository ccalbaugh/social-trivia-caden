import React, { Component } from 'react';
import AnswerForm from '../Form/answerForm';

class Team extends Component {

    render() {
        
        const { id } = this.props.match.params

        return (
            <section className="team">
                <AnswerForm id={id} name={id} />
            </section>
        )
    }
}

export default Team
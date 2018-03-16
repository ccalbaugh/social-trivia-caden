import React, { Component } from 'react'
import Form from './Form/answerForm'
import Timer from './Timer/timer'
import Teams from './Teams/teams'
class SocialTriviaApp extends Component {

    render() {
        return (
            <main>
                <Form/>
                <Timer/>
                <Teams/>
            </main>
        )
    }
}

export default SocialTriviaApp
import React, { Component } from 'react'
import HostBar from './HostBar/hostBar'
import Teams from './Teams/teams'

class SocialTriviaApp extends Component {

    render() {
        return (
            <main>
                <HostBar/>
                <hr/>
                <Teams />
            </main>
        )
    }
}

export default SocialTriviaApp
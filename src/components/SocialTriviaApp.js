import React, { Component } from 'react'
import HostBar from './HostBar/hostBar'
import Teams from './Teams/teams'
import { fetchAnswersFromDB } from '../actions/answers'
import { connect } from "react-redux"

export class SocialTriviaApp extends Component {

    componentDidMount() {
        this.props.fetchAnswersFromDB()
    }

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

export default connect(null, { fetchAnswersFromDB })(SocialTriviaApp);
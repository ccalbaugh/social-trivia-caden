import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateTeam, submitTeamScoreToDB, fetchTeamsFromDB } from '../../actions/teams'
import { resetTimer } from '../../actions/timer'
import AnswerForm from '../Form/answerForm'
import Timer from '../Timer/timer'

function updateTeams() {

    const { teams, updateTeam, submitTeamScoreToDB } = this.props

    if (teams) {
        const teamKeys = Object.keys(teams)
        const expectedAnswer = teams['admin'].answer

        if (!!expectedAnswer) {

            const teamsWithPerfectAnswers = teamKeys.filter((team) => {
                return team !== 'admin' &&
                    teams[team].answer === expectedAnswer
            })
        
            if (teamsWithPerfectAnswers.length) {
        
                let teamsWithNoPoints = teamKeys.filter((team) => {
                    return !teamsWithPerfectAnswers.find((item) => {
                        return item === team
                    })
                })
        
                teamsWithPerfectAnswers.forEach((team) => { updateTeam(1, team); submitTeamScoreToDB(teams[team].score, team, 1) })
        
                teamsWithNoPoints.forEach((team) => { updateTeam(0, team); submitTeamScoreToDB(teams[team].score, team, 0) })
    
            } else {           
        
                const sortedAndFilteredTeamsByAnswer = teamKeys.filter((team) => {
                    return team !== 'admin' && teams[team].answer <= expectedAnswer
                })
                .sort((a, b) => a - b)
                .map((teamId) => { return { ...this.props.teams[teamId], id: teamId } })
        
                const teamsWithWinningAnswers = findMultipleWinners(sortedAndFilteredTeamsByAnswer)
        
                if (teamsWithWinningAnswers && teamsWithWinningAnswers.length) {                        
        
                    const teamsWithNoPoints = teamKeys.filter((team) => {
                        return !teamsWithWinningAnswers.find((item) => {
                            return item === team
                        })
                    })
        
                    teamsWithNoPoints.forEach((team) => { updateTeam(0, team); submitTeamScoreToDB(teams[team].score, team, 0) })
        
                    teamsWithWinningAnswers.forEach((team) => { updateTeam(1, team); submitTeamScoreToDB(teams[team].score, team, 1) })
        
                } else {                                       
    
                    teamKeys.forEach((team) => { updateTeam(0, team); submitTeamScoreToDB(teams[team].score, team, 0) })
    
                }
            }
        }
    }
}

function findMultipleWinners(sortedArr) {
    if (sortedArr.length) {
        let bestAnswer = sortedArr[0].answer
        return sortedArr.reduce((acc, curr) => {
            curr.answer === bestAnswer && acc.push(curr.id)
            return acc
        }, [])
    }
}

export class HostBar extends Component {

    state = {
        teams: [
            { name: 'Admin', id: 'admin'}
        ]
    }

    componentDidMount() {
        this.props.fetchTeamsFromDB()
    }

    render() {
        const { teams } = this.props
        const teamAnswers = teams && Object.keys(teams).filter( (team) => team !== 'admin' && teams[team].answer )
        const isDisabled = teamAnswers && !teamAnswers.length
        return (
            <section>
                 <AnswerForm id={this.state.teams[0].id}/>
                 <Timer/>
                 <button className="update-teams-button"
                         onClick={updateTeams.bind(this)}
                         disabled={isDisabled}
                >
                    Update Teams
                </button>
                <Link to="/teams" target="_blank" >Open Game View</Link>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams,
        timer: state.timer,
    }
}

export default connect(mapStateToProps, { updateTeam, resetTimer, submitTeamScoreToDB, fetchTeamsFromDB })(HostBar);

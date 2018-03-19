import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateTeam } from '../../actions/teams'
import { resetTimer } from '../../actions/timer'
import AnswerForm from '../Form/answerForm'
import Timer from '../Timer/timer'

function updateTeams() {
    const { teams, updateTeam } = this.props
    
    if (teams) {
        const teamKeys = Object.keys(teams)
        const expectedAnswer = teams['admin'].answer
    
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
    
            teamsWithPerfectAnswers.forEach((team) => {
                updateTeam(1, team)
            })
    
            teamsWithNoPoints.forEach((team) => {
                updateTeam(0, team)
            })

        } else {
    
            const sortedAndFilteredTeamsByAnswer = teamKeys.filter((team) => {
                return team !== 'admin' && teams[team].answer <= expectedAnswer
            })
            .sort((a, b) => a - b)
            .map((teamId) => { return { ...this.props.teams[teamId], id: teamId } })
    
            const teamsWithWinningAnswers = findMultipleWinners(sortedAndFilteredTeamsByAnswer)
    
            if (teamsWithWinningAnswers.length) {
    
                const teamsWithNoPoints = teamKeys.filter((team) => {
                    return !teamsWithWinningAnswers.find((item) => {
                        return item === team
                    })
                })
    
                teamsWithNoPoints.forEach((team) => {
                    updateTeam(0, team)
                })
    
                teamsWithWinningAnswers.forEach((team) => {
                    updateTeam(1, team)
                })
    
            } else {

                teamKeys.forEach((team) => {
                    updateTeam(0, team)
                })

            }
        }
    }
}

function findMultipleWinners(sortedArr) {
    let bestAnswer = sortedArr[0].answer
    return sortedArr.reduce((acc, curr) => {
        curr.answer === bestAnswer && acc.push(curr.id)
        return acc
    }, [])
}

export class HostBar extends Component {

    state = {
        teams: [
            { name: 'Admin', id: 'admin'}
        ]
    }

    render() {
        const { teams } = this.props
        const isDisabled = !(teams && Object.keys(teams).length)
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

export default connect(mapStateToProps, { updateTeam, resetTimer })(HostBar);

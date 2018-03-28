import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateTeam, submitTeamScoreToDB, fetchTeamsFromDB, toggleShowAnswers, deleteTeam } from '../../actions/teams'
import { resetTimer } from '../../actions/timer'
import { database } from '../../data/firebase'
import AnswerForm from '../Form/answerForm'
import Timer from '../Timer/timer'
import Teams from '../Teams/teams'
import './hostBar.css'

const millisecondsInADay = 86400000;

function updateTeams() {

    const { teams, updateTeam, submitTeamScoreToDB, toggleShowAnswers, isShowingAnswers } = this.props

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
                    return team !== 'admin' && teams[team].isSubmitted && parseFloat(teams[team].answer) <= parseFloat(expectedAnswer)
                })              
                .sort((a, b) => {
                    return teams[b].answer - teams[a].answer 
                })
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

    toggleShowAnswers(isShowingAnswers)
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

function showAnswers() {
    this.props.toggleShowAnswers(this.props.isShowingAnswers)
}

export class HostBar extends Component {

    componentDidMount() {
        this.props.fetchTeamsFromDB()
        database.ref('isShowingAnswers').set(false)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.teams !== this.props.teams) {
            const { teams } = nextProps;
            const now = Date.now();
            if (teams) {
                Object.keys(teams).forEach(teamKey => {
                    if (teams[teamKey].createdAt + millisecondsInADay <= now) {
                        this.props.deleteTeam(teamKey)
                    }
                })
            }
        }
    }

    render() {
        const id = 'admin'
        const { teams, isShowingAnswers } = this.props
        const teamAnswers = teams && Object.keys(teams).filter( (team) => team !== 'admin' && teams[team].answer )
        const isDisabled = !teamAnswers || !teamAnswers.length || !teams['admin'].answer
        const isUpdateButtonDisabled = isDisabled || !isShowingAnswers 
        const isShowAnswersButtonDisabled = isDisabled || isShowingAnswers
         
        return (
            <section className='host-bar'>
                <div className='host-bar-inner'>
                    <Timer parentId={id} />
                    <AnswerForm id={id}/>

                    <div className={'game-view-admin'}>

                        <button className="update-teams-button"
                                onClick={updateTeams.bind(this)}
                                disabled={isUpdateButtonDisabled}
                        >
                            Update Scores
                        </button>
                        <button className="show-answers-button"
                                onClick={showAnswers.bind(this)}
                                disabled={isShowAnswersButtonDisabled}
                        >
                            Show Answers
                        </button>

                        <Link className='button' to="/teams" target="_blank" >Game View</Link>
                    </div>

                    { (!!teams['admin'] && !!teams['admin'].answer && !isShowingAnswers) && 
                    <span className="correct-answer">{`Correct Answer: ${teams['admin'].answer}`}</span> }
                </div>

                <Teams parentId={id} />

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams,
        timer: state.timer,
        isShowingAnswers: state.isShowingAnswers
    }
}

export default connect(mapStateToProps, { updateTeam, resetTimer, submitTeamScoreToDB, fetchTeamsFromDB, toggleShowAnswers, deleteTeam })(HostBar);

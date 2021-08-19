import React, { Component } from 'react'
import UserCard from './UserCard'
import { connect } from 'react-redux'


class Leaderboard extends Component {
    render () {
        const { usersList } = this.props
        return (
            usersList.map((user) =>  <UserCard user={user} key={user.id} /> )
        )
    }
}
function mapStateToProps({authedUser, users}) {
    const userId = Object.keys(users)
    const fakedata = userId.map((fakeId) => {
        const fakeUser = {
            id: users[fakeId].id,
            name: users[fakeId].name,
            avatarURL: users[fakeId].avatarURL,
            answeredQuestions: Object.keys(users[fakeId].answers).length,
            unansweredQuestions: users[fakeId].questions.length,
            resault: 0
        }
        const score = fakeUser.answeredQuestions + fakeUser.unansweredQuestions
        fakeUser.resault = score
        
        return fakeUser
    })
        const usersList = fakedata.sort((a,b) => b.resault - a.resault )
        return {
            authedUser,
            usersList
        }
}   
export default  connect(mapStateToProps)(Leaderboard)

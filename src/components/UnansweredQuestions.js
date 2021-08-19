import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


export class UnansweredQuestions extends Component {
  render() {
    const { questionIds } = this.props

    return (
      <div>
        {questionIds.map((id) => (
          <Question id={id} toViewPoll={true} key={id} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  const answersId =  Object.keys(users[authedUser].answers)
  
  return {
    questionIds: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp).filter((unId) => 
      !answersId.includes(unId)
    )
  }
}

export default connect(mapStateToProps)(UnansweredQuestions)
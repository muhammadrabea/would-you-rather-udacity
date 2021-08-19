import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


export class AnsweredQuestions extends Component {
  render() {
    const { questionIds } = this.props

    return (
      <div>
        {questionIds.map((id) =>
          <Question id={id} toViewPoll={false} key={id} />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  const answersIds = users[authedUser].answers
  return {
    questionIds: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp).filter((id)=>{
      return answersIds.hasOwnProperty(id)
    })
  }
}

export default connect(mapStateToProps)(AnsweredQuestions)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import PollResault from './PollResault'
import Error from './Error'
class ViewQuestion extends Component {

    render () {
        const {questionId, answersIds} = this.props   
        if ( answersIds.hasOwnProperty(questionId) === false ) {
            return <Poll id={questionId} />
        } else if ( answersIds.hasOwnProperty(questionId) === true ) {
            return <PollResault id={questionId} />
        } else {
            return <Error/>
        }
    
    }
}
function mapStateToProps ({ users, authedUser}, props) {
    const questionId = props.match.params.id
    const answersIds = users[authedUser].answers

    return {
        answersIds,
        questionId
    }
}
export default connect(mapStateToProps)(ViewQuestion)

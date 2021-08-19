import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER, ADD_QUESTION_TO_USER, ADD_ANSWER_TO_USER  } from '../constants/constants'
import { showLoading, hideLoading } from 'react-redux-loading'


//Receive questions
export function receiveQuestion (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

// Add question
function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}
function addQuestionToUser ({authedUser, qid}) {
    return {
        type: ADD_QUESTION_TO_USER,
        authedUser,
        qid
    }
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
    return (dispatch) => {

        dispatch(showLoading())
        return saveQuestion ({
            optionOneText,
            optionTwoText,
            author
        })
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(addQuestionToUser({authedUser: author, qid: question.id}))
            dispatch(hideLoading())
        })
    }

}

//Add answer
function addAnswer ({authedUser, qid, answer}) {
    return {
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer
    }

}

function addAnswerToUser ({authedUser, qid, answer}) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}

export function handleAddAnswer ({ authedUser, qid, answer}) {
    return (dispatch,  ) => {
        dispatch(showLoading())
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then(() => {
            dispatch(addAnswer({authedUser, qid, answer}))
            dispatch(addAnswerToUser({authedUser, qid, answer}))
            dispatch(hideLoading())
        }
        )
    }
}


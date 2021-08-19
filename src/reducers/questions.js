import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER } from '../constants/constants'

export default function questions(questions = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...questions,
                ...action.questions
            }
        case ADD_QUESTION: {
            const { question } = action
            return {
                ...questions,
                [question.id]: question
            }
        }
        case ADD_ANSWER: 
            const { authedUser, qid, answer } = action
            const questionOptions = questions[qid][answer]
            return {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    [answer]: {
                        ...questionOptions,
                       votes: [...questionOptions.votes, authedUser],
                    }
                }
            }

        default:
            return questions
    }
}
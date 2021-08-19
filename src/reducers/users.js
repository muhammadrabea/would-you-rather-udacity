import { RECEIVE_USERS, ADD_QUESTION_TO_USER, ADD_ANSWER_TO_USER } from "../constants/constants"

export default function users(users = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...users,
                ...action.users
            }
        case ADD_QUESTION_TO_USER: {
            const { authedUser, qid } = action
            return {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: [...users[authedUser].questions, qid]
                }
            }
        }
        case ADD_ANSWER_TO_USER: {
            const { authedUser, qid, answer } = action
            return {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        }
        default:
            return users
    }
}
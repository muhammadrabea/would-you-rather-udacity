import { _saveQuestion, _saveQuestionAnswer, _getQuestions, _getUsers } from "./_DATA";

export function getInitialData () {
    return Promise.all([
        _getQuestions(),
        _getUsers(),
    ]).then(([questions, users]) => ({
        users,
        questions
    }))
}

export function saveQuestion (question) {
    return _saveQuestion(question)
  }
  
  export function saveQuestionAnswer({authedUser, qid, answer}) {
    return _saveQuestionAnswer({ authedUser, qid, answer });
  }

  export const login = () => {
      sessionStorage.getItem('isAuthenticated', true)
  }

  export const logout = () => {
    sessionStorage.clear()
  }

  export const isAuthenticated = () => !!sessionStorage.getItem('isAuthenticated')
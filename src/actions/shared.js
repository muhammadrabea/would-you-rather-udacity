import { hideLoading, showLoading } from 'react-redux-loading'

import { getInitialData } from '../utils/api';
import { receiveQuestion } from '../actions/questions';
import { receiveUsers } from '../actions/users';


export function handleInitialData(){
    return(dispatch)=>{
        dispatch(showLoading())
        return getInitialData()
        .then(({users,questions})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQuestion(questions))
            dispatch(hideLoading())
        })
    }
}
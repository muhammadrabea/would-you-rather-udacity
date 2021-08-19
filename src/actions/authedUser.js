import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from "../constants/constants"

export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

export function removeAuthedUser () {
    return {
        type: REMOVE_AUTHED_USER
    }
}


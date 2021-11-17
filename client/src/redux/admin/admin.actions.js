import {AdminActionTypes} from './admin.types'

export const setAdmin = () => ({
    type: AdminActionTypes.SET_ADMIN,
    payload: true
})

export const removeAdmin = () => ({
    type: AdminActionTypes.REMOVE_ADMIN,

})

export const userLogin = (token) => ({
    type: AdminActionTypes.USER_LOGIN,
    payload: token
})

export const userLogout = () => ({
    type: AdminActionTypes.USER_LOGOUT,
})
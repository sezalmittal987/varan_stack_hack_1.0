import {AdminActionTypes} from './admin.types'

 //TODO : ToChange
const INITIAL_STATE = {
    // isAdmin: false,
    isAdmin: true,
    user: null
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case AdminActionTypes.SET_ADMIN:
        return{
            ...state,
            isAdmin: action.payload
        }
        case AdminActionTypes.REMOVE_ADMIN:
            return{
                ...state,
                isAdmin: false
            }
            case AdminActionTypes.USER_LOGIN:
                return{
                    ...state,
                    user: action.payload
                }
            case AdminActionTypes.USER_LOGIN:
                return{
                    ...state,
                    user: null
                }
        default:
        return state
    }
}
export default adminReducer;
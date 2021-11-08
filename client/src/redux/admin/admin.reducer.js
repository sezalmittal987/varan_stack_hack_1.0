import {AdminActionTypes} from './admin.types'

 //TODO : ToChange
const INITIAL_STATE = {
    // isAdmin: false,
    isAdmin: true
    
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
        default: 
        return state
    }
}
export default adminReducer;
import { UsersState, UserTypes } from '../actions/types'
import {Reducer} from 'redux'

const initialState: UsersState = {
    users: [],
    user: {
        id: Number(''),
        usuario: ''
    }
}

const reducer: Reducer<UsersState> = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case UserTypes.USER_CREATE: {
            const response = payload ? payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case UserTypes.USER_GET: {
            const response = payload ? payload.data : null
            return {...state, users: response}
        }
        case UserTypes.USER_GET_SINGLE: {
            const response = payload ? payload.data[0] : null
            return {...state, user: response}
        }
        case UserTypes.USER_UPDATE: {
            const response = payload ? payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case UserTypes.USER_DELETE: {
            if(payload.id){
                return {...state, users: state.users.filter(user=>user.id !== payload.id)}
            }
            else{
                return {...state}
            }
        }

        default: {
            return state
        }
    }
}

export default reducer
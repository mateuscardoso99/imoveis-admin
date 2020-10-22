import { CorretoresState,CorretorTypes } from '../actions/types'
import {Reducer} from 'redux'

const initialState: CorretoresState = {
    corretores: [],
    corretor: {
        id: Number(''),
        nome: '',
        email: '',
        image: ''
    }
}

const reducer: Reducer<CorretoresState> = (state = initialState, action) => {
    const {type, payload} = action
    switch(action.type){
        case CorretorTypes.CORRETOR_CREATE: {
            const response = action.payload ? action.payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case CorretorTypes.CORRETOR_GET: {
            const response = action.payload ? action.payload.data : null
            return {...state, corretores: response}
        }
        case CorretorTypes.CORRETOR_GET_SINGLE: {
            const response = action.payload ? action.payload.data[0] : null
            return {...state, corretor: response}
        }
        case CorretorTypes.CORRETOR_UPDATE: {
            const response = action.payload ? action.payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case CorretorTypes.CORRETOR_DELETE: {
            console.log('payload.action reducer',action)
            if(action.payload.id){
                return {...state, corretores: state.corretores.filter(crt=>crt.id !== action.payload.id)}
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
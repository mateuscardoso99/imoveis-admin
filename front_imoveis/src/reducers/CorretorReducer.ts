import { CorretoresState,CorretorTypes } from '../actions/types'
import {Reducer} from 'redux'

const initialState: CorretoresState = {
    corretores: [],
    corretor: {
        id: Number(''),
        nome: '',
        email: '',
        imagem: ''
    }
}

const reducer: Reducer<CorretoresState> = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case CorretorTypes.CORRETOR_CREATE: {
            const response = payload ? payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case CorretorTypes.CORRETOR_GET: {
            const response = payload ? payload.data : null
            return {...state, corretores: response}
        }
        case CorretorTypes.CORRETOR_GET_SINGLE: {
            const response = payload ? payload.data[0] : null
            return {...state, corretor: response}
        }
        case CorretorTypes.CORRETOR_UPDATE: {
            const response = payload ? payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case CorretorTypes.CORRETOR_DELETE: {
            console.log('payload.action reducer',action)
            if(payload.id){
                return {...state, corretores: state.corretores.filter(crt=>crt.id !== payload.id)}
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
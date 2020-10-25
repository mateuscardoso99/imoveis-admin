import { ImoveisState,ImovelTypes } from '../actions/types'
import {Reducer} from 'redux'

const initialState: ImoveisState = {
    imoveis: [],
    imovel: {
        id: Number(''),
        descricao: '',
        endereco: '',
        detalhes: '',
        imagens: [],
        latitude: Number(''),
        longitude: Number(''),
        cidade: '',
        uf: '',
        valor: Number(''),
        id_categoria: Number(''),
        id_corretor: Number('')
    }
}

const reducer: Reducer<ImoveisState> = (state = initialState, action) => {
    const {type, payload} = action
    switch(action.type){
        case ImovelTypes.IMOVEL_CREATE: {
            const response = action.payload ? action.payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case ImovelTypes.IMOVEL_GET: {
            const response = action.payload ? action.payload.data : null
            return {...state, imoveis: response}
        }
        case ImovelTypes.IMOVEL_GET_SINGLE: {
            const response = action.payload ? action.payload.data[0] : null
            //console.log('reducer imovel',response)
            return {...state, imovel: response}
        }
        case ImovelTypes.IMOVEL_UPDATE: {
            const response = action.payload ? action.payload.data : null
            const data = response ? response.data : null
            return {...state, data}
        }
        case ImovelTypes.IMOVEL_DELETE: {
            console.log('payload.action reducer',action)
            if(action.payload.id){
                return {...state, imoveis: state.imoveis.filter(crt=>crt.id !== action.payload.id)}
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
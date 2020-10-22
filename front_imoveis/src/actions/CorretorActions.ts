import { CorretorTypes} from './types'
import {apiGet,apiPost,apiDelete,apiPut} from '../services/api'

export const corretorCreate = async (data: any) => {
    const payload = await apiPost('/corretores',data)
    return {type: CorretorTypes.CORRETOR_CREATE, payload}
}

export const corretorGetSingle = async (id: number) => {
    const payload = await apiGet(`/corretores/${id}`)
    return {type: CorretorTypes.CORRETOR_GET_SINGLE, payload}
}

export const corretorGet = async () => {
    const payload = await apiGet('/corretores')
    return {type: CorretorTypes.CORRETOR_GET, payload}
}

export const corretorUpdate = async (id: number, data: any) => {
    const payload = await apiPut(`/corretores/${id}`,data)
    return {type: CorretorTypes.CORRETOR_UPDATE, payload}
}

export const corretorDelete = async (id: number) => {
    const payload = await apiDelete(`/corretores/${id}`)
    console.log('payload action',payload)
    if(payload.status === 204){
        return {type: CorretorTypes.CORRETOR_DELETE, payload: {id}}
    }
    else if(payload.status === 200){
        return {type: CorretorTypes.CORRETOR_DELETE, payload: 'error delete corretor'}
    }
    else{
        return {type: CorretorTypes.CORRETOR_DELETE, payload}
    }
}
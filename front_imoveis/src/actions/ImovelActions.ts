import { ImovelTypes } from './types'
import {apiGet,apiPost,apiDelete,apiPut} from '../services/api'

export const imovelCreate = async (data: any) => {
    const payload = await apiPost('/imoveis',data)
    return {type: ImovelTypes.IMOVEL_CREATE, payload}
}

export const imovelGetSingle = async (id: number) => {
    const payload = await apiGet(`/imoveis/${id}`)
    //console.log('action imovel',payload)
    return {type: ImovelTypes.IMOVEL_GET_SINGLE, payload}
}

export const imovelGet = async () => {
    const payload = await apiGet('/imoveis')
    return {type: ImovelTypes.IMOVEL_GET, payload}
}

export const imovelUpdate = async (id: number, data: any) => {
    const payload = await apiPut(`/imoveis/${id}`,data)
    return {type: ImovelTypes.IMOVEL_UPDATE, payload}
}

export const imovelDelete = async (id: number) => {
    const payload = await apiDelete(`/imoveis/${id}`)
    console.log('payload action',payload)
    if(payload.status === 204){
        return {type: ImovelTypes.IMOVEL_DELETE, payload: {id}}
    }
    else if(payload.status === 200){
        return {type: ImovelTypes.IMOVEL_DELETE, payload: 'error delete imovel'}
    }
    else{
        return {type: ImovelTypes.IMOVEL_DELETE, payload}
    }
}
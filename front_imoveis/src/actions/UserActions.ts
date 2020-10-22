import { UserTypes} from './types'
import {apiGet,apiPost,apiDelete,apiPut} from '../services/api'

export const userCreate = async (data: any) => {
    const payload = await apiPost('/users',data)
    return {type: UserTypes.USER_CREATE, payload}
}

export const userGetSingle = async (id: number) => {
    const payload = await apiGet(`/users/${id}`)
    return {type: UserTypes.USER_GET_SINGLE, payload}
}

export const userGet = async () => {
    const payload = await apiGet('/users')
    return {type: UserTypes.USER_GET, payload}
}

export const userUpdate = async (id: number, data: any) => {
    const payload = await apiPut(`/users/${id}`,data)
    return {type: UserTypes.USER_UPDATE, payload}
}

export const userDelete = async (id: number) => {
    const payload = await apiDelete(`/users/${id}`)
    if(payload.data === 'user limit error'){
        return {type: UserTypes.USER_DELETE, payload: 'user limit error'}
    }
    else if(payload.status === 204){
        return {type: UserTypes.USER_DELETE, payload: {id}}
    }
    else{
        return {type: UserTypes.USER_DELETE, payload}
    }
}
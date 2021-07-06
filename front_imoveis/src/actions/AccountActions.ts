import {AccountTypes} from './types'
import {apiPost} from '../services/api'

export const signIn = async (data: any) => {
    const payload = await apiPost('/sign-in',data)
    return {type: AccountTypes.SIGN_IN, payload}
}

export const signOut = async () => {
    return {type: AccountTypes.SIGN_OUT, payload: {}}
}

export const initAccount = async () => {
    return {type: AccountTypes.INIT_ACCOUNT, payload: {}}
}
import { AccountState,AccountTypes } from '../actions/types'
import {Reducer} from 'redux'
import {
    getAccount,
    setAccount,
    setToken,
    setRefreshToken,
    removeAccount,
    removeToken,
    removeRefreshToken
} from '../storage/account'

const initialState: AccountState = {
    account: ''
}

const reducer: Reducer<AccountState> = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case AccountTypes.SIGN_IN: {
            const response = payload ? payload.data : null
            const account = response ? response.user : null
            const metadata = response ? response.metadata : null
            const token = metadata ? metadata.token : null
            const refreshToken = metadata ? metadata.removeToken : null

            if (account) setAccount(account)
            if (token) setToken(token)
            if (refreshToken) setRefreshToken(refreshToken)

            return {...state, account}
        }

        case AccountTypes.SIGN_OUT: {
            removeAccount()
            removeToken()
            removeRefreshToken()
            return {...state, account: ''}
        }

        case AccountTypes.INIT_ACCOUNT: {
            const account = getAccount()
            return {...state, account}
        }

        default: {
            return state
        }
    }
}

export default reducer
import {createStore,applyMiddleware,Store} from 'redux'
import ReduxPromise from 'redux-promise'

import {UsersState, CorretoresState, ImoveisState, AccountState} from './actions/types'

import rootReducer from './rootReducer'

export interface AplicationState{
    users: UsersState,
    corretores: CorretoresState,
    imoveis: ImoveisState,
    account: AccountState
}

const store: Store<AplicationState> = createStore(rootReducer, applyMiddleware(ReduxPromise))

export default store
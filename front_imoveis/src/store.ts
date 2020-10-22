import {createStore,applyMiddleware,combineReducers, Store} from 'redux'
import ReduxPromise from 'redux-promise'

import {UsersState, CorretoresState, ImoveisState} from './actions/types'

import rootReducer from './rootReducer'

export interface AplicationState{
    users: UsersState,
    corretores: CorretoresState,
    imoveis: ImoveisState
}

const store: Store<AplicationState> = createStore(rootReducer, applyMiddleware(ReduxPromise))

export default store
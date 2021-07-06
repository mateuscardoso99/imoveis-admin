import {combineReducers} from 'redux'

import users from './reducers/UserReducer'
import corretores from './reducers/CorretorReducer'
import imoveis from './reducers/ImovelReducer'
import account from './reducers/AccountReducer'

export default combineReducers({
    users,
    corretores,
    imoveis,
    account
})
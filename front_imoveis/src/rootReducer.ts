import {combineReducers} from 'redux'

import users from './reducers/UserReducer'
import corretores from './reducers/CorretorReducer'
import imoveis from './reducers/ImovelReducer'

export default combineReducers({
    users,
    corretores,
    imoveis
})
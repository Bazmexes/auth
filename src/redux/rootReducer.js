import {combineReducers} from 'redux'
import contactsReducer from './reducers/contactsReducers'
import logReducer from './reducers/logReducer'
export default combineReducers({contactsReducer, logReducer})
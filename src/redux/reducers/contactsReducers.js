import {_UPDATECONTACTSREDUCER} from '../actions/actionsTypes'
const initialState = {
    contacts: []
}
export default function(state = initialState, action){
    switch(action.type){
        case _UPDATECONTACTSREDUCER :
            return{
            contacts: action.payload
            }
        default: return state
    }
}
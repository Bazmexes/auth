import {actionLogIn} from '../actions/actions'
import {_LOGIN} from '../actions/actionsTypes'
const initialState = {
    log: false,
    users: []
}

export default function(state=initialState, action){

    switch (action.type){
        case _LOGIN:{
            const index = action.payload.findIndex(item => item.email === action.userData.email)
            console.log(index)
            if(index === -1){
                return state
            }else{
                console.log("dsds")
                if(action.payload[index].password === action.userData.password){
                    return {
                        log: true,
                        users: [...action.payload]
                    }
                }else{
                    return state
                }

            }

        }
        default: return state
    }
}
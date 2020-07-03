import {_UPDATECONTACTSREDUCER, _LOGIN} from './actionsTypes'
export function actionUpdateContactReducer(contacts){
    return{
        type: _UPDATECONTACTSREDUCER,
        payload: contacts
    }
}

export function actionLogIn(contacts, userData){
    return{
        type: _LOGIN,
        payload: contacts,
        userData: userData
    }
}
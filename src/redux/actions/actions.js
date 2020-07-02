import {_UPDATECONTACTSREDUCER} from './actionsTypes'
export function actionUpdateContactReducer(contacts){
    return{
        type: _UPDATECONTACTSREDUCER,
        payload: contacts
    }
}
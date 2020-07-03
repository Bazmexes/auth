import React from 'react'
import { connect } from 'react-redux'
import { actionUpdateContactReducer } from '../../redux/actions/actions'
import { Redirect } from 'react-router-dom'
class Contacts extends React.Component {
    componentDidMount() {
        this._updateContactField()
    }

    _createUser() {
        const user = {
            name: 'новый контакт',
        }
        fetch('http://localhost:3000/contacts', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => this._updateContactField())
        
    }

    _updateContactField() {
        fetch('http://localhost:3000/db')
            .then((res) => res.json())
            .then(
                (result) => {
                    this.props._dispatchUpdade(result.contacts)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    render() {
        if(this.props.log){
            return (
                <div className='mainContent'>
                    {this.props.contacts.map((contact, index) => {
                        return <div key={index}>{contact.name}</div>
                    })}
                    <button
                        onClick={() => {
                            this._createUser()
                        }}>
                        Добавить контакт
                    </button>
                </div>
            )
        }else{
            return (
                <Redirect to="/"/>
            )
        }
        
    }
}
function mapStateToProps(state) {
    return {
        contacts: state.contactsReducer.contacts,
        log: state.logReducer.log
    }
}
function mapDispatchToProps(dispatch) {
    return {
        _dispatchUpdade: (contacts) =>
            dispatch(actionUpdateContactReducer(contacts)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contacts)

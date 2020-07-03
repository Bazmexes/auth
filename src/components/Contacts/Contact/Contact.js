import React from 'react';
import './contact.scss'
import {connect} from 'react-redux'
import {actionUpdateContactReducer} from '../../../redux/actions/actions'

class Contact extends React.Component{
    state = {
        name: '',
        phone: '',
        email: ''
    }
    _changeContact(e){
        console.log(e.target.id)
        const nameValue = document.getElementById(`${e.target.id}name`).innerHTML
        const phoneValue = document.getElementById(`${e.target.id}phone`).innerHTML
        const emailValue = document.getElementById(`${e.target.id}email`).innerHTML
        const updatedContact = {
            id: e.target.id,
            name: "ujd",
            phone: phoneValue,
            email: emailValue 
        }
        fetch(`http://localhost:3000/contacts/${e.target.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedContact),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => this._updateContactField())
            
    }
    _deleteContact(e) {
        fetch(`http://localhost:3000/contacts/${e.target.id}`,{
            method: "DELETE"
        })
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
    render(){
        console.log(this.props)
        return(
            <form className="contact">

                    <input value={this.props.contact.name}></input>


                    {/* <p id={`${this.props.contact.id}name`}>{this.props.contact.name}</p> */}
                    <p id={`${this.props.contact.id}phone`}>{this.props.contact.phone}</p>
                    <p id={`${this.props.contact.id}email`}>{this.props.contact.email}</p>
                    <div className="contact__box-button">
                        <button id={this.props.contact.id} onClick={(e)=> this._changeContact(e)}>Изменить</button>
                        <button id={this.props.contact.id} onClick={(e)=> this._deleteContact(e)}>Удалить</button>
                    </div>
                    
            </form>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Contact)
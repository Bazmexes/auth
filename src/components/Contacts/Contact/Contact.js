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
    _handlerChange(e){
        this.setState({ [e.target.name] : e.target.value})

        console.log("contact", this.state)
    }
    _changeContact(e){
        console.log(e.target.name)

        const updatedContact = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email 
        }
 
        fetch(`http://localhost:3000/contacts/${e.target.name}`, {
            method: "PUT",
            body: JSON.stringify(updatedContact),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => this._updateContactField())
            this._toggleForm(e)
        
    }
    _deleteContact(e) {
        fetch(`http://localhost:3000/contacts/${e.target.name}`,{
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
    _toggleForm(e){
        console.log("toggleForm", e.target.name)
        const form = document.getElementById(`${e.target.name}form`)
        console.log(form)
        form.classList.toggle('form_active')
        this.setState({
            name: this.props.contact.name,
            phone: this.props.contact.phone,
            email: this.props.contact.email
        })
    }
    render(){
        console.log(this.props)
        return(
            <div className="contact">
            <div className="contact__p" >
                    <p id={`${this.props.contact.id}name`}>{this.props.contact.name}</p> 
                    <p id={`${this.props.contact.id}phone`}>{this.props.contact.phone}</p>
                    <p id={`${this.props.contact.id}email`}>{this.props.contact.email}</p> 
                    <div className="contact__box-button">
                        <button name={this.props.contact.id} id={`${this.props.contact.id}button`}  onClick={(e)=> this._toggleForm(e)}>Изменить</button>
                        <button name={this.props.contact.id} onClick={(e)=> this._deleteContact(e)}>Удалить</button>
                    </div>
            </div>
            <form onSubmit={(e)=>e.preventDefault(e)} className="contact__change-form" id={`${this.props.contact.id}form`}>
                    <input type="text" name="name" onChange={(e)=> this._handlerChange(e)} id={`${this.props.contact.id}name`} value={this.state.name} placeholder={this.props.contact.name}/>
                    <input type="tel" name="phone" onChange={(e)=> this._handlerChange(e)} id={`${this.props.contact.id}name`} value={this.state.phone} placeholder={this.props.contact.phone}/>
                    <input type="email" name="email" onChange={(e)=> this._handlerChange(e)} id={`${this.props.contact.id}name`} value={this.state.email} placeholder={this.props.contact.email}/>
                    <div className="contact__box-button">
                        <button name={this.props.contact.id} onClick={(e)=> this._changeContact(e)}>Сохранить</button>
                        <button name={this.props.contact.id} onClick={(e)=> this._toggleForm(e)}>Отмена</button>
                    </div>
            </form>
            </div>
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
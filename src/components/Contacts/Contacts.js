import React from 'react'
import { connect } from 'react-redux'
import { actionUpdateContactReducer } from '../../redux/actions/actions'
import { Redirect } from 'react-router-dom'
import Contact from './Contact/Contact'
import ContactsWrap from './ContactsWrap/ContactsWrap'
import './contacts.scss'
class Contacts extends React.Component {
    componentDidMount() {
        this._updateContactField()
    }

    _createUser() {
        if(this.state===null){

        }else{
            const user = {
                "id": "",
                "name": this.state.name,
                "phone": this.state.phone,
                "email": this.state.email
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
    _handlerChange(e) {
        this.setState({ [e.target.name] : e.target.value});
        console.log("state", this.state)
     }
    render() {
        if(this.props.log){
            return (
                <div className='contacts'>
                    <div>
                        <h2 style={{textAlign:"center"}}>Список контактов</h2>
                        <ContactsWrap contacts={this.props.contacts} updateContacts={this._updateContactField}/>
                        <div className="contacts__form_box">
                            <h3>Добавить контакт</h3>
                            <form onSubmit={(e)=> e.preventDefault()}>
                                <input name="name" type="text" onChange={(e)=>this._handlerChange(e)} required placeholder="Введите имя" />
                                <input name="phone" onChange={(e)=>this._handlerChange(e)} type="tel" placeholder="Введите номер"/>
                                <input name="email" onChange={(e)=>this._handlerChange(e)} type="email" placeholder="Введите почту"/>
                                <div className="contacts__button-box">
                                    <button type="submit"
                                    onClick={() => {
                                        this._createUser()
                                    }}>
                                    Добавить
                                </button> 
                                <button type="reset">
                                    Сбросить
                                </button> 
                                </div>
                                
                            </form>

                        </div>

                    </div>

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

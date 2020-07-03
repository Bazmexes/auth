import React from 'react'

export default class FormAddContact extends React.Component {
    _handlerChange(e) {
        this.setState({ [e.target.name] : e.target.value});
        console.log("state", this.state)
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
                .then(() => this.props.updateContacts())
        }
    }
    render() {
        return (
            <div className="contacts__form_box">
            <h3>Добавить новый контакт</h3>
            <form onSubmit={(e)=> e.preventDefault()}>
                <input name="name" type="text" onChange={(e)=>this._handlerChange(e)} placeholder="Введите имя контакта" required />
                <input name="phone" onChange={(e)=>this._handlerChange(e)} type="tel" placeholder="Введите номер контакта" />
                <input name="email" onChange={(e)=>this._handlerChange(e)} type="email" placeholder="Введите почту контакта"/>
                <button type="submit"
                    onClick={() => {
                        this.props.createUser()
                    }}>
                    Добавить контакт
                </button> 
            </form>

        </div>
        )
    }
}

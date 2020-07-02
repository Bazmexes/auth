import React from 'react'
import {connect} from 'react-redux'
import {actionUpdateContactReducer} from '../redux/actions/actions'
class Test extends React.Component{


    componentDidMount() {
      this._updateContactField()
      }

      _createUser(){
          const user = {
              "name": "новый контакт" 
          }
          fetch('http://localhost:3000/contacts', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => response.json())
          .then(json => console.log(json))
          this._updateContactField()
      }

    _updateContactField(){
      fetch("http://localhost:3000/db")
      .then(res => res.json())
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
      console.log(this.state)
      return(
          <div className="mainContent">
             {this.props.contacts.map((contact, index)=>{
                 return(
                     <div key={index}>{contact.name}</div>
                 )
             })}
             <button onClick={this._createUser.bind(this)}>Добавить контакт</button>
          </div>
      )
  }
}
function mapStateToProps(state){
  return{
    contacts: state.contactsReducer.contacts
  }
}
function mapDispatchToProps(dispatch){
  return{
    _dispatchUpdade: contacts => dispatch(actionUpdateContactReducer(contacts))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)
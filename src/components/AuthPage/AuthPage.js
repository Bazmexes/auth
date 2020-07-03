import React from 'react';
import {connect} from 'react-redux'
import './authPage.scss'
import {Redirect, Route} from 'react-router-dom'
import {actionLogIn} from '../../redux/actions/actions'
class AuthPage extends React.Component{
    _stopReload(e){
        e.preventDefault()
    }
    _logIn(){
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value
        const user ={
            email: email,
            password: password
        }
        console.log(user)
        fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.props.dispatchLogIn(result, user)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render(){
        console.log("this.props.log", this.props.log)
        if(this.props.log===false){
            return(
                <div className="auth-page">
                <div className="auth-page__content">
                    <form onSubmit={(e)=>this._stopReload(e)}>
                        <input id="emailInput"  type="email" required/>
                        <input id="passwordInput" type="password" required/>
                        <input type="submit" onClick={()=> this._logIn()}/>
                    </form>
                </div>
                </div>)
        }else{
            return(
                <Redirect to="/contact"/>

            )
        }
    }
}
            

        


function mapStateToProps(state){
    return{
        log: state.logReducer.log
    }
}
function mapDispatchToProps(dispatch){
    return{
        dispatchLogIn: (usersFromServer, userData) => dispatch(actionLogIn(usersFromServer, userData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
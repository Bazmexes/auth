import React from 'react'
import './App.css'
import Contacts from './components/Contacts/Contacts'
import AuthPage from './components/AuthPage/AuthPage'
import Layout from './components/Layout/Layout'
import { Route, Switch, Redirect } from 'react-router-dom'

function App() {
    return (
        <div className='App'>
            <Switch>
                <Route path="/contact" render={()=><Contacts/>}/>
                <Route path="/"component={Layout}/>
                <Redirect to="/"/>
            </Switch>
        </div>
    )
}

export default App

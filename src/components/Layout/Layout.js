import React from 'react';
import AuthPage from '../AuthPage/AuthPage'
import './layout.scss'
export default class NameClass extends React.Component{
    render(){
        return(
            <div className="layout">
                <div className="layout__content">
                    <AuthPage/>
                </div>
            </div>
        )
    }
}
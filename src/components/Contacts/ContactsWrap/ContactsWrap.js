import React from 'react';
import Contact from '../Contact/Contact'
import './contactsWrap.scss'
export default class NameClass extends React.Component{
    render(){
        console.log(this.props)
        return(
            <div className="contact-wrap">
                <div className="contact-wrap__content">
                    <div className="contact-wrap__content_box">
                        <p>имя</p>
                        <p>номер</p>
                        <p>почта</p>
                        <p>кнопка для изменения контакта</p>
                    </div>
                    {this.props.contacts.map((contact, index)=>{
                        return (
                            <Contact contact={contact} key={index} updateContacts={this.props.updateContacts}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}
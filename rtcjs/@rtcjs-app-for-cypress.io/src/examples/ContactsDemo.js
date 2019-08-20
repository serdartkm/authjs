import React from 'react'
import Contacts from '@rtcjs/contacts'
import io from 'socket.io-client'

const ContactInDemo = ({ name, serverUrl }) => {
    return <div className={name} style={{ display: "flex", backgroundColor: "orange", height: 200, margin: 5, flexDirection: "column" }}>
        <div > {name}{" "}</div>
        <Contacts name={name} serverUrl={serverUrl} >{({ search, connected }) => {
            return <div>{connected && "connected"}
                <input name="search" type="text" onChange={search} />
            </div>
        }}</Contacts></div>

}



class ContactsDemo extends React.Component {

    componentWillMount() {
        this.socket = io("http://localhost:3000/", { query: "foo=bar" })
        this.socket.on('connect', () => {
            this.socket.emit('delete_all', (contacts) => {
            })
        })
    }

    render() {
        const serverUrl = "http://localhost:3000/"
        return <div>{[{ name: "deros", serverUrl }, { name: "feros", serverUrl }].map((i, key) => {
            return <ContactInDemo key={key} name={i.name} serverUrl={i.serverUrl} />
        })}</div>
    }
}

export default ContactsDemo
'use strict';
const PubSub = require('pubsub-js')
const uniqid = require('uniqid')

class SocketClient {
    constructor(token = "", id) {
        this.handshake = { query: { token } }
        if (id === undefined) {
            throw new Error("username undefined")
        }
        else {
            this.id = id
        }
        PubSub.subscribe(`server`, (msg, data) => { //client first
            PubSub.publishSync('connect', { id: this.id, handshake: this.handshake })
        })
    }

    on = (event, cb) => {
        PubSub.subscribe(`${event}${this.id}`, (msg, data) => {
            this.connected = true
            debugger
            cb(data)
        })
    }

    emit = (event, data) => {
        debugger
        PubSub.publishSync(`${event}${this.id}`, data)
    }
}

module.exports = function (token, username) {

    return new SocketClient(token, username)

}
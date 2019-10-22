'use strict';
const PubSub  =require ('pubsub-js')
const uniqid =require('uniqid')
class SocketClient {
    constructor(token = "") {
      
      
        this.events = []
        this.rooms = []
        this.handshake = {query:{token}}
    
        this.id = uniqid()

        PubSub.subscribe("listening", (msg,data)=>{
             debugger
            PubSub.unsubscribe('listening')
               PubSub.publishSync('connect', {id:this.id,handshake:this.handshake})
           })
    }


    on = (event, cb) => {
    debugger
        PubSub.subscribe(`${this.id}${event}`, (msg, data) => {
            cb(data)

        })

        if (this.rooms.length > 0) {
            this.rooms.forEach(r => {
                PubSub.subscribe(`${r}${event}`, (msg, data) => {
                    cb(data)
                })
            })
        }
    }

    emit = (event, data) => {

        PubSub.publishSync(`${this.id}${event}`, data)
    }
    
 
}
//


module.exports = function(handshake){

    return new SocketClient(handshake)
}
'use strict';
const PubSub  =require ('pubsub-js')
const uniqid =require('uniqid')
class SocketClient {
    constructor(token = "",id) {
      
      
        this.handshake = {query:{token}}
        if(id === undefined)
        this.id = uniqid()
        this.id=id

 

     
    }

    connect=()=>{
       
        PubSub.publishSync('connect', {id:this.id,handshake:this.handshake})
    }

    on = (event, cb) => {
   //PubSub.publishSync('connect', {id:this.id,handshake:this.handshake})

        PubSub.subscribe(`${this.id}${event}`, (msg, data) => {
  
            cb(data)

        })

      
    }

    emit = (event, data) => {

        PubSub.publishSync(`${this.id}${event}`, data)
    }
    
 
}
//


module.exports = function(handshake,id){

    return new SocketClient(handshake,id)
}
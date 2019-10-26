'use strict';
const PubSub  =require ('pubsub-js')
const uniqid =require('uniqid')
let interval
class SocketClient {
    constructor(token = "",id) {
      

        this.handshake = {query:{token}}
        if(id === undefined){
       
            throw new Error("username undefined")
        }
        else{
            this.id=id
        }
 
            PubSub.subscribe(`listening`, (msg, data) => {
                debugger
                PubSub.publishSync('connect', {id:this.id,handshake:this.handshake})
                PubSub.unsubscribe('listening')
               
            })
    

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


module.exports =  function(token,username){

return  new SocketClient(token,username)




  
}
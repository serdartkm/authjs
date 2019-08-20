import React from 'react'
import MessagingModule from '@rtcjs/messaging-module'
import io from "socket.io-client";
const  firstUser = io("http://localhost:3000/", { query: `name=tkm.house.new@gmail.com` });
const secondUser = io("http://localhost:3000/", { query: `name=tkm.house.old@gmail.com` });
class Home extends React.Component{

    render(){
     
        return (
     <div style={{display:"flex", justifyContent:"space-between" }}>
    
         Home
     </div>
        )
    }
}

export default Home 
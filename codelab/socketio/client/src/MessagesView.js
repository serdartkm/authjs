import React from 'react'


const MessagesView =({messages=[]})=>{

    return messages.map((message,i)=>{
        return <div key={i}>{message.user}:{message.text}</div>
    })

}


export default MessagesView
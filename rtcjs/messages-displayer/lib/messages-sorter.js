import React from 'react'

const MessageSorter =({messages=[],children})=>{
const messagesSorted =messages.sort((a, b)=> a.datetime - b.datetime)
    return children({messages:messagesSorted})
}

export default MessageSorter
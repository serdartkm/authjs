import {h} from 'preact'
import {useEffect,useState} from 'preact/hooks'

const useMessageSorter =(messages)=>{
const [sortedMessages,setSortedMessages]=useState(messages)
useEffect(()=>{

    setSortedMessages(messages.sort((a, b)=> a.datetime - b.datetime))
},[messages])

return{sortedMessages}
}

export default useMessageSorter


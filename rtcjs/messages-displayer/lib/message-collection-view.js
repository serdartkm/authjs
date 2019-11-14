import {h} from 'preact'
import MessageObjectMapper from './message-object-mapper'
const MessageCollectionView = ({ messages }) =>{

    if(messages.length>0){
        return  messages.map((message, key) => <MessageObjectMapper {...message} key={key} />)
    }
    else return null
}

export default MessageCollectionView
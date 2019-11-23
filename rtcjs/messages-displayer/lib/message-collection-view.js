/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import {h} from 'preact'
import MessageObjectMapper from './message-object-mapper'

const MessageCollectionView = ({ messages }) =>{

    if(messages.length>0){
       
        return  messages.map((message, i) => <MessageObjectMapper {...message} key={i} />)
    }
     return null
}

export default MessageCollectionView
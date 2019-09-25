import React from 'react'
import MessageObjectMapper from './message-object-mapper'
const MessageCollectionView = ({ messages }) =>
 messages.map((message, key) => <MessageObjectMapper {...message} key={key} />)
export default MessageCollectionView
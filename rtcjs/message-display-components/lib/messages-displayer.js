import React from 'react'
import MessagesSorter from './messages-sorter'
import MessagesMapper from './messages-mapper'
import MessageCollectionView from './message-collection-view'
const MessagesDisplayer = ({ messages }) => {

    return (
        <MessagesSorter messages={messages}>{({ messages }) => {
            return (<MessagesMapper messages={messages}>{({ messages }) => {
                return (
                    <MessageCollectionView messages={messages} />
                )
            }}</MessagesMapper>)
        }}</MessagesSorter>
    )
}
export default MessagesDisplayer


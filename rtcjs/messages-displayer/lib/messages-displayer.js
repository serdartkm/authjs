/* eslint-disable no-shadow */
import {h} from 'preact'
import useMessageSorter from './useMessageSorter'
import useMessageMapper from './useMessageMapper'
import MessageCollectionView from './message-collection-view'
import MessageViewScroller from './messages-view-scroller'

const MessagesDisplayer = ({ messages }) => {
    const {sortedMessages}= useMessageSorter(messages)
    const {mappedMessages}=useMessageMapper(sortedMessages)

                return (
                    <MessageViewScroller>
                        <MessageCollectionView messages={mappedMessages} />
                    </MessageViewScroller>

                )
            }
export default MessagesDisplayer


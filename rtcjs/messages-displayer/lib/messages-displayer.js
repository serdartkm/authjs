/* eslint-disable no-shadow */
import {h} from 'preact'
import MessagesSorter from './messages-sorter'
import MessagesMapper from './messages-mapper'
import MessageCollectionView from './message-collection-view'
import MessageViewScroller from './messages-view-scroller'

const MessagesDisplayer = ({ messages }) => {

    return (
        <MessagesSorter messages={messages}>
{({ messages }) => {
            return (
<MessagesMapper messages={messages}>
{({ messages }) => {
                return (
                    <MessageViewScroller>
                        <MessageCollectionView messages={messages} />
                    </MessageViewScroller>

                )
            }}
</MessagesMapper>
)
        }}

        </MessagesSorter>
    )
}
export default MessagesDisplayer


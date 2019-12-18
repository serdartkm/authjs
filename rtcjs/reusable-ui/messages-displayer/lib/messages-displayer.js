/* eslint-disable no-shadow */
import { h } from "preact";
import useMessageSorter from "./useMessageSorter";
import useMessageMapper from "./useMessageMapper";
import MessageCollectionView from "./message-collection-view";
import MessageViewScroller from "./messages-view-scroller";
import MessageEditorDisplayer from "../../message-editor-displayer";

const MessagesDisplayer = ({
  messages,
  socket,
  id,
  messageText,
  sendMessage,
  handleMessageChange
}) => {
  const { sortedMessages } = useMessageSorter(messages);
  const { mappedMessages } = useMessageMapper(sortedMessages);
  return [

      <MessageViewScroller>
        <MessageCollectionView messages={mappedMessages} />
      </MessageViewScroller>,
      <MessageEditorDisplayer
        disabled={socket === null}
        id={id}
        message={messageText}
        sendMessage={sendMessage}
        onMessageChange={handleMessageChange}
      />

  ];
};

export default MessagesDisplayer;

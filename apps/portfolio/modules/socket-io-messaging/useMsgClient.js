import {h} from 'preact'
import useSocketMessaging from "../../../../rtcjs/reusable-hooks/useSocketMessaging";
import useChatLog from "../../../../rtcjs/reusable-hooks/useChatLog";

const useMsgClient =({ name, targetName, socket })=>{

    const {
        connected,
        errors,
        handleMessageChange,
        messageRecieved,
        messageSent,
        messageText,
        sendMessage
      } = useSocketMessaging({ socket, targetName });
      const { messages } = useChatLog({ name, messageRecieved, messageSent });

      return {messages,messageRecieved,messageSent,messageText,sendMessage,errors,connected,handleMessageChange}
}

export default useMsgClient
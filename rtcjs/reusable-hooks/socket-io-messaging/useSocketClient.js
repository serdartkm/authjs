import {h} from 'preact'
import useSocketMessaging from "./useSocketMessaging";
import useChatLog from "../useChatLog";
import useSocket from "./useSocket"
const useSocketClient =({ name, targetName,route,serverUrl })=>{
   const {socket, connected, socketError} = useSocket({username:name,route,serverUrl})
    const {
 
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

export default useSocketClient
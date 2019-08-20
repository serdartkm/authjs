'use strict';
import {DateLine,FirstMessageLeft,FirstMessageRight,SubMessageLeft,SubMessageRight,MessageContainer} from '@rtcjs/message-display-components'
import MessageRender from '@rtcjs/message-render'


const MessageDisplayer =({messages})=>{

    return (<MessageRender 
        messages={messages} 
        MessageContainer={MessageContainer} 
        DateLine={DateLine}
        FirstMessageLeft={FirstMessageLeft}
        FirstMessageRight={FirstMessageRight} 
        SubMessageLeft={SubMessageLeft}
        SubMessageRight={SubMessageRight} />)
}
export default MessageDisplayer
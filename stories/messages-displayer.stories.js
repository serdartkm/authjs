import {h} from 'preact';

 import MessagesDispaler, { MessageAligner,DateLinebreak,Avatar,FirstMessage,SubsequentMessage,MessageView,MessageObjectMapper,MessageCollectionView} from '../rtcjs/messages-displayer'
import messages from './fake-data/messages'

const ChildComponent = ({ text }) => {
  return (
<div style={{ width: 100, backgroundColor: "yellow" }}>
Child,
{text}
</div>
)
}

export default{
  title:"MessagesDisplayers"
}


  export const messageAligner =()=>{
    return (
      <div>
      <MessageAligner side="left" style={{ backgroundColor: "blue" }}>
        <ChildComponent text="on left side" />
      </MessageAligner>
      <MessageAligner side="right" style={{ backgroundColor: "green" }}>
        <ChildComponent text="on right side" />
      </MessageAligner>
      </div>
    )
  }
export const dateLineBreak =()=>{
  return(
    <DateLinebreak datetime={1569393960355} />
  )
}
export const avatar =()=>{
  return(
<Avatar letter="A" />
  )
}
export const firstMessageRemote =()=>{
  return (
<FirstMessage datetime={1569393960355} message="First Message" letter="d" />
  )
}
 export const firstMessageLocal =()=>{
   return(
<FirstMessage datetime={1569393960355} message="First Message" letter="m" local />
   )
 }

 export const subsequentMessage=()=>{
   return (
<SubsequentMessage datetime={1569393960355} message="Subsequent Message" />
   )
 }
 export const messageView =()=>{
   return (
<MessageView datetime={1569393960355} message="hello" />
   )
 }

 export const messageObjectMapperRemote =()=>{
   return(
<MessageObjectMapper datetime={1569393960355} side="left" message="hello" letter="F" order="F" local={false} dateSpace />
   )
 }
export const messageObjectMapperLocal =()=>{
  return(
<MessageObjectMapper datetime={1569393960355} side="right" message="hello" letter="F" order="F" local dateSpace />
  )
}
export const messageCollectionView =()=>{
  return(
<MessageCollectionView messages={messages} />
  )
}

export const messageDisplayer =()=>{
  return(
<MessagesDispaler messages={messages} />
  )
}
  // .add("MessageCollectionView", () => ())
  // .add("MessagesDispaler", () => ())

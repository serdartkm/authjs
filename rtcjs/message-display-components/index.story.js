import React from 'react';
import { storiesOf } from '@storybook/react';
import {MessageObjectMapper, MessageAligner, DateLinebreak, SubsequentMessage, MessageView, FirstMessage, Avatar,MessageCollectionView } from './index'

const ChildComponent = ({ text }) => {
  return <div style={{ width: 100, backgroundColor: "yellow" }}>Child,{text}</div>
}
const messages=[{datetime: 1569393960355, side:"right", message:"hello", letter:"D", order:"F", local:true,dateSpace:true},
{datetime: 1569393960355, side:"left", message:"hi", letter:"D", order:"F", local:false,dateSpace:false},
{datetime: 1569393960355, side:"left", message:"what are you doing", letter:"D", order:"S", local:false,dateSpace:false},

{datetime: 1569393960355, side:"right", message:"I am reading a book", letter:"D", order:"F", local:true,dateSpace:false},
{datetime: 1569393960355, side:"right", message:"What are you doing", letter:"D", order:"S", local:true,dateSpace:false},

{datetime: 1569393960355, side:"left", message:"I am sining a song", letter:"D", order:"F", local:false,dateSpace:true},
]
storiesOf('message-display-components', module)
  .add('MessageObjectViewAligner', () => (
    <div>
      <MessageAligner side="left" style={{ backgroundColor: "blue" }}>
        <ChildComponent text="on left side" />
      </MessageAligner>
      <MessageAligner side="right" style={{ backgroundColor: "green" }}>
        <ChildComponent text="on right side" />
      </MessageAligner>
    </div>

  ))

  .add("MessageDateLinebreak", () => (
    <DateLinebreak datetime={1569393960355} />
  ))
  .add("Avatar", () => (<Avatar letter="A" />))
  .add("FirstMessage remote", () => (<FirstMessage datetime={1569393960355} message="First Message" letter ="d" />))
  .add("FirstMessage local", () => (<FirstMessage datetime={1569393960355} message="First Message" letter ="m" local={true}/>))
  .add("SubsequentMessage", () => (<SubsequentMessage datetime={1569393960355} message="Subsequent Message" />))
  .add("MessageView", () => (<MessageView datetime={1569393960355} message="hello" />))

  .add("MessageObjectMapper (remote, left)", () => (<MessageObjectMapper datetime={1569393960355} side="left" message="hello" letter="F" order="F" local={false} dateSpace={true}/>))
  .add("MessageObjectMapper (local,right)", () => (<MessageObjectMapper datetime={1569393960355} side="right" message="hello" letter="F" order="F" local={true} dateSpace={true}/>))
  .add("MessageCollectionView", () => (<MessageCollectionView messages={messages}/>))

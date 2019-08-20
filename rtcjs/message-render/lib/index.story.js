import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageRender from './index'
import  {DateLine,FirstMessageLeft,FirstMessageRight,SubMessageLeft,SubMessageRight,MessageContainer}from '../../message-display-components/lib/index'
const messages = [
    {
        local: true,
        message: "--first Message (local)",
        datetime: new Date(2019, 6, 27, 13, 30, 0),
        from: "tkm.house.new@gmail.com",
        emoji: ''
    },
    
    {
        local: false,
        message: "--second Message (remote)",
        datetime: new Date(2019, 6, 27, 13, 31, 0),
        from: "tkm.house.old@gmail.com",
        emoji: ''
    },
    
    {
        local: true,
        message: "---third Message (local)",
        datetime: new Date(2019, 6, 27, 13, 32, 0),
        from: "tkm.house.new@gmail.com",
        emoji: ''
    },
    
    
    {
        local: true,
        message: "---forth Message (local)",
        datetime: new Date(2019, 6, 27, 13, 33, 0),
        from: "tkm.house.new@gmail.com",
        emoji: ''
    },

    
    {
        local: false,
        message: "---fifth Message (remote)",
        datetime: new Date(2019, 6, 27, 13, 34, 0),
        from: "tkm.house.old@gmail.com",
        emoji: ''
    },
    
    
    {
        local: false,
        message: "---sixth Message (remote)",
        datetime: new Date(2019, 6, 28, 13, 34, 0),
        from: "tkm.house.old@gmail.com",
        emoji: ''
    },
    {
        local: true,
        message: "---seventh Message (local)",
        datetime: new Date(2019, 6, 29, 13, 34, 0),
        from: "tkm.house.new@gmail.com",
        emoji: ''
    },
    {
        local: true,
        message: "---eighth Message (local)",
        datetime: new Date(2019, 6, 29, 13, 35, 0),
        from: "tkm.house.new@gmail.com",
        emoji: ''
    }
    
]

storiesOf('MessageRender', module)
  .add('MessageRender', () => (
    <MessageRender 
     messages={messages} 
     MessageContainer={MessageContainer} 
     DateLine={DateLine}
     FirstMessageLeft={FirstMessageLeft}
     FirstMessageRight={FirstMessageRight} 
     SubMessageLeft={SubMessageLeft}
     SubMessageRight={SubMessageRight} />
  ))
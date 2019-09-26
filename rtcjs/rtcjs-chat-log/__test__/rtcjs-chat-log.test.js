
import React from 'react'
import RTCChatLog from '../index'
import {shallow} from 'enzyme'

const wrapper =shallow(<RTCChatLog messageSent={null} messageRecieved={null} name="dragos" >{({messages})=><div>Message length is :{messages.length}</div>}</RTCChatLog>)
const instance = wrapper.instance()
describe("ChatLog component",()=>{

    describe("Testing component functionality",()=>{

        it("messages and errors should equal []",()=>{
           instance.componentDidMount()
           expect(instance.state).toEqual({messages:[],errors:[]})
        })

        it("messages state should update",()=>{
            const firstMessageSent = {message:"first message",reciever:"mario",datetime:"1"}
            const secondMessageSent ={message:"second message",reciever:"mario",datetime:"2"}
            const firstMessageRecieved ={message:"first message recieved",sender:"mario",datetime:"1"}
            const secondMessageRecieved ={message:"second message recieved",sender:"mario",datetime:"2"}

            wrapper.setProps({messageSent:firstMessageSent})
            expect(instance.state.messages).toEqual([
            {message:"first message",from:"dragos",to:"mario",local:true,datetime:"1"}])
           
            wrapper.setProps({messageSent:secondMessageSent})
            expect(instance.state.messages).toEqual([
            {message:"first message",from:"dragos",to:"mario",local:true,datetime:"1"},
            {message:"second message",from:"dragos",to:"mario",local:true,datetime:"2"}])
          
            wrapper.setProps({messageRecieved:firstMessageRecieved})
            expect(instance.state.messages).toEqual(
            [{message:"first message",from:"dragos",to:"mario",local:true,datetime:"1"},
            {message:"second message",from:"dragos",to:"mario",local:true,datetime:"2"},
            {message:"first message recieved",from:"mario",to:"dragos",local:false,datetime:"1"},])            
           
            wrapper.setProps({messageRecieved:secondMessageRecieved})
            expect(instance.state.messages).toEqual(
                [{message:"first message",from:"dragos",to:"mario",local:true,datetime:"1"},
                {message:"second message",from:"dragos",to:"mario",local:true,datetime:"2"},
                {message:"first message recieved",from:"mario",to:"dragos",local:false,datetime:"1"},
                {message:"second message recieved",from:"mario",to:"dragos",local:false,datetime:"2"}
                
            ])
          
        })
        it("chilren prop should be called with messages arg",()=>{
          wrapper.children({messages:instance.state.messages})
          expect(wrapper.equals(<div>Message length is :4</div>)).toBe(true)
        })
    })

})

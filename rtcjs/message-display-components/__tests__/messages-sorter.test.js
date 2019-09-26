import React from 'react'
import MessageSorter from '../lib/messages-sorter'
import {shallow} from 'enzyme'
const messages =[
{message:"hello",from:"dragos",to:"mario",local:false,datetime:3},
{message:"hello",from:"dragos",to:"mario",local:false,datetime:2},
{message:"hello",from:"dragos",to:"mario",local:false,datetime:5},
{message:"hello",from:"dragos",to:"mario",local:false,datetime:1}
]
const ChildComponent= ({messages})=><div>message length is,{messages.length}</div>
describe("MessagesSorter Component",()=>{
    const wrapper =shallow(<MessageSorter messages={messages}>{({messages})=><ChildComponent messages={messages}/>}</MessageSorter>)

    it("MessagesSorder sorts correctly",()=>{
        expect(wrapper.find(ChildComponent).props().messages).toHaveLength(messages.length)
        expect(wrapper.find(ChildComponent).props().messages[0].datetime).toEqual(1)
        expect(wrapper.find(ChildComponent).props().messages[1].datetime).toEqual(2)
        expect(wrapper.find(ChildComponent).props().messages[2].datetime).toEqual(3)
        expect(wrapper.find(ChildComponent).props().messages[3].datetime).toEqual(5)
    })

})
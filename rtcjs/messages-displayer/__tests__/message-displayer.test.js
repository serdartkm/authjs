import React from 'react'
import {mount} from 'enzyme'
import MessageDispaler from '../lib/messages-displayer'
import MessageObjectMapper from '../lib/message-object-mapper'
import {messagesForMessagesDisplayer} from '../index.story'
import MessagesSorter from '../lib/messages-sorter'
import MessagesMappter from '../lib/messages-mapper'
describe("Integration testing for MessageDisplayer component",()=>{
    const wrapper =mount(<MessageDispaler messages ={messagesForMessagesDisplayer}/>)
it("contains MessageObjectMapper,MessagesSorter,MessagesMappter ",()=>{

    expect(wrapper.find(MessageObjectMapper)).toHaveLength(8)
    expect(wrapper.find(MessagesSorter)).toHaveLength(1)
    expect(wrapper.find(MessagesMappter)).toHaveLength(1)


 
})


it("messages sorted correctly",()=>{
    expect(wrapper.find(MessageObjectMapper).at(4).props().message).toEqual(messagesForMessagesDisplayer[4].message)
  })


})
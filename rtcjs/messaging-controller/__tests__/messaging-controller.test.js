'use strict';
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//import expect from 'expect'
import { checkProps } from '../../../Utils/index'
import MockedSocket from 'socket.io-mock';
import { shallow, mount } from 'enzyme';
import MessageController from '../lib'
import { isFunction } from 'util';


Enzyme.configure({ adapter: new Adapter() });
const MessageDispatcher = () => null
const setUp = (props = {}) => {
  const component = shallow(<MessageController {...props}>{({ sendMessage, onMessageChange }) => { <div>Hello</div> }}</MessageController>)
  return component
}

let socket = new MockedSocket();
const expectedProps = {
  name: 'Test user',
  targetName: "Test target user",
  socket: socket
}

let wrapper = setUp(expectedProps)


describe('<MessageController/>', () => {
  describe('render', () => {
    it('render <MessageController/>', () => {
      expect(wrapper).toHaveLength(1)
    });
  })

  describe('Checking PropTypes', () => {
    it('Should not throw a warning', () => {
      const propsError = checkProps(MessageController, expectedProps)
      expect(MessageController.propTypes).toBeDefined()
      expect(propsError).toBeUndefined()
    })
  })

  describe('Checking State', () => {
    it('Initial state should be null', () => {
      expect(wrapper.state().messageRecieved).toBeNull()
      expect(wrapper.state().messageSent).toBeNull()
    })
    it('Initial state should be false', () => {
      expect(wrapper.state().connected).toBe(false)
    })
  })

  describe('Checking socket connection state', () => {
    it('connected state should be true', () => {
      wrapper.instance().componentDidMount()
      socket.socketClient.emit('connect', '');
      expect(wrapper.state().connected).toBe(true)
    })

    it('connected state should be false', () => {
      wrapper.instance().componentDidMount()
      socket.socketClient.emit('disconnect', '');
      expect(wrapper.state().connected).toBe(false)
    })


  })

  describe("Checking renderProps", () => {
    it("props {messageSent, messageRecieved, message} is passed to children", () => {
      const messageRecieved = { sender: "userSender", datetime: new Date().getTime(), message: "Hello" }
      const messageSent = { receiver: "userReciever", datetime: new Date().getTime(), message: "hi" }
      const message = "Hello message"

      const wrapper = shallow(<div><MessageController>{(x = 0) => (
        <h1>
          {messageRecieved.sender},{messageRecieved.datetime},{messageRecieved.message},
          {messageSent.receiver},{messageSent.datetime},{messageSent.message},{message}
        </h1>
      )}</MessageController></div>)
        .find(MessageController).renderProp('children')({ messageRecieved, messageSent, messageSent })
      expect(wrapper.equals(<h1>{messageRecieved.sender},{messageRecieved.datetime},{messageRecieved.message},{messageSent.receiver},{messageSent.datetime},{messageSent.message},{message}</h1>)).toBe(true)

    })
  })

  describe("Checking {sendMessage,onMessageChange} function", () => {
    it("should be defined and be able to send a massage", () => {

      socket.on('text_message', ({ message }) => {
        expect(message === "mymessage").toBe(true)
      })

      const wrapper = setUp({...expectedProps,socket:socket.socketClient}) 
      wrapper.setState({ message: "mymessage" })
      wrapper.instance().sendMessage()

      expect(wrapper.state().messageSent.reciever === expectedProps.targetName).toBe(true)
      expect(wrapper.state().messageSent.message === "mymessage").toBe(true)
      // expect(wrapper.state().messageSent.datetime === ).toBe(true)
    })

    it("Should be defined and passed to render props", () => {
   
      const wrapper = mount(<MessageController {...expectedProps}>{({ sendMessage, onMessageChange }) => (
        <MessageDispatcher sendMessage={sendMessage} onMessageChange={onMessageChange} />
      )}</MessageController>)
      expect(isFunction(wrapper.find(MessageDispatcher).prop('sendMessage'))).toBe(true)
      expect(isFunction(wrapper.find(MessageDispatcher).prop('onMessageChange'))).toBe(true)
    })

    it('{onMessageChange} function, should be able to change message state', () => { 
  
      const wrapper = mount(<MessageController {...expectedProps}>{({ sendMessage, onMessageChange }) => (
        <MessageDispatcher sendMessage={sendMessage} onMessageChange={onMessageChange} />
      )}</MessageController>)
      wrapper.find(MessageDispatcher).props()
      const e ={target:{value:"helloo"}}
      wrapper.find(MessageDispatcher).prop('onMessageChange')(e)
      expect(wrapper.state().message ==="helloo").toBe(true)
    })


  })
});
test.todo('test messageSent datetime');
test.todo('Check prop length passed from parent');
test.todo('contol all required pros are passed from parent, name,targetName,socket');
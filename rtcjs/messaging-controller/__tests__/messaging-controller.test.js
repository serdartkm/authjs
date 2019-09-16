'use strict';
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockedSocket from 'socket.io-mock';
import { shallow, mount } from 'enzyme';
import MessageController from '../lib'
import { ExpectInitialState, ExpectedPropTypes, ExpectComponentRender, ExpectClassMethods, ExpectedRenderProp, ExpectStateChange } from '../../../Utils/react-test-boilerplate/index'
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

const classMethods = ['sendMessage', 'onMessageChange']
const renderPropsPassed = [{ messageSent: null }, { messageRecieved: null }, { message: "" }, { errors: [] }, { sendMessage: () => { } }, { onMessageChange: () => { } }]
let wrapper = setUp(expectedProps)

ExpectComponentRender(MessageController, expectedProps)
ExpectInitialState(MessageController, expectedProps, { messageRecieved: null, messageSent: null, message: "", connected: false, errors: [] })
ExpectedPropTypes(MessageController, expectedProps)
ExpectClassMethods(MessageController, classMethods, expectedProps)
ExpectedRenderProp(MessageController, renderPropsPassed, expectedProps)

ExpectStateChange(MessageController, expectedProps)
  .fromState({ messageSent: null })
  .ByClassMethod('sendMessage')
  .toState({ messageSent: { reciver: expectedProps.targetName, message: "hello from api", datetime: "123" } })


describe('<MessageController/>', () => {

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

  describe("Checking {sendMessage,onMessageChange} function", () => {
    it("should be defined and be able to send a massage", () => {

      socket.on('text_message', ({ message }) => {
        expect(message === "mymessage").toBe(true)
      })

      const wrapper = setUp({ ...expectedProps, socket: socket.socketClient })
      //wrapper.setState({ message: "mymessage" })
      // wrapper.instance().sendMessage()

      //  expect(wrapper.state().messageSent.reciever === expectedProps.targetName).toBe(true)
      //  expect(wrapper.state().messageSent.message === "mymessage").toBe(true)
      // expect(wrapper.state().messageSent.datetime === ).toBe(true)
    })

    it('{onMessageChange} function, should be able to change message state', () => {

      const wrapper = mount(<MessageController {...expectedProps}>{({ sendMessage, onMessageChange }) => (
        <MessageDispatcher sendMessage={sendMessage} onMessageChange={onMessageChange} />
      )}</MessageController>)
      wrapper.find(MessageDispatcher).props()
      const e = { target: { value: "helloo" } }
      wrapper.find(MessageDispatcher).prop('onMessageChange')(e)
      expect(wrapper.state().message === "helloo").toBe(true)
    })

  })
});
test.todo('test messageSent datetime');
test.todo('Check prop length passed from parent');
test.todo('contol all required pros are passed from parent, name,targetName,socket');
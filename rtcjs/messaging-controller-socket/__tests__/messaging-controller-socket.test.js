'use strict';
import{h} from 'preact'
import MockedSocket from 'socket.io-mock';
import { shallow } from 'enzyme';
import MessageController from '../index'
var sinon = require('sinon');
import { ExpectInitialState, ExpectedPropTypes, ExpectComponentRender, ExpectClassMethods, ExpectedRenderProp, ExpectStateChange } from '../../../Utils/react-test-boilerplate/index'
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

sinon.useFakeTimers(new Date().getTime());
const classMethods = ['sendMessage', 'onMessageChange']
const renderPropsPassed = [{ messageSent: null }, { messageRecieved: null }, { message: "" }, { errors: [] }, { sendMessage: () => { } }, { onMessageChange: () => { } }]
let wrapper = setUp(expectedProps)
const e = { target: { value: "mymessage" } }


describe('<MessageController/>', () => {

  ExpectComponentRender(MessageController, expectedProps)
  ExpectInitialState(MessageController, expectedProps, { messageRecieved: null, messageSent: null, message: "", connected: false, errors: [] })
  ExpectedPropTypes(MessageController, {name:"peros",targetName:"deros",socket})
  ExpectClassMethods(MessageController, classMethods, expectedProps)
  ExpectedRenderProp(MessageController, renderPropsPassed, expectedProps)
  ExpectStateChange(MessageController, expectedProps)
    .fromState({ messageSent: null, message: "hello from api" })
    .ByClassMethod('sendMessage')
    .toState({ messageSent: { reciever: expectedProps.targetName, message: "hello from api", datetime: new Date().getTime() } })

  ExpectStateChange(MessageController, expectedProps)
    .fromState({ message: "" })
    .ByClassMethod("onMessageChange", e)
    .toState({ message: "mymessage" })

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
      wrapper.setState({ message: "mymessage" })
      wrapper.instance().sendMessage()
      expect(wrapper.state().messageSent.reciever === expectedProps.targetName).toBe(true)
      expect(wrapper.state().messageSent.message === "mymessage").toBe(true)
      expect(wrapper.state().messageSent.datetime === new Date().getTime() ).toBe(true)
    })
  })

});


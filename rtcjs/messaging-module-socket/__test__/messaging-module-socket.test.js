import React from 'react'
import { mount } from 'enzyme'
import io from "socket.io-client";
import MessagingModuleSocket from '../index'
import MessagingController from '../../messaging-controller-socket'
import MessagesDisplayer from '../../messages-displayer'
import MessageEditorDisplayer from '../../message-editor-displayer'
import RTCChatLog from '../../rtcjs-chat-log'
import MockedSocket from 'socket.io-mock';
import {render,fireEvent, cleanup} from '@testing-library/react'
const serverURL = "http://localhost:3000/"
const socket = io(serverURL, { query: `name=mario@gmail.com` });
afterEach(cleanup)
describe("MessagingModuleSocket", () => {
    
    const wrapper = mount(<MessagingModuleSocket name="mario" targetName="dragos" socket={socket} />)
    it("Child components exist", () => {

        expect(wrapper.find(MessagingController)).toHaveLength(1)
        expect(wrapper.find(MessagesDisplayer)).toHaveLength(1)
        expect(wrapper.find(MessageEditorDisplayer)).toHaveLength(1)
        expect(wrapper.find(RTCChatLog)).toHaveLength(1)

    })

    it("SendMessage Btn is disabled for empty message", () => {
        const { getByText}= render(<MessagingModuleSocket  name="mario" targetName="dragos" socket={socket}/>)
        expect(getByText("Send")).toBeDisabled()
    })
    it("SendMessage btn is enabled after entering some text",()=>{
        const {getByText,getByPlaceholderText}= render(<MessagingModuleSocket  name="mario" targetName="dragos" socket={socket}/>)
        fireEvent.change(getByPlaceholderText("Enter message text"),{target:{value:"hello"}})
        expect(getByText("Send")).toBeEnabled()
    })
//
   

    it("input is cleared after message send btn is clicked",()=>{
        const {getByText,getByPlaceholderText}= render(<MessagingModuleSocket  name="mario" targetName="dragos" socket={socket}/>)
        fireEvent.change(getByPlaceholderText("Enter message text"),{target:{value:"some message"}})
        fireEvent.click(getByText("Send"))
        expect(getByPlaceholderText("Enter message text")).toBeEmpty()
    })

    it("Message send is visible",()=>{
        const {getByText,getByPlaceholderText}= render(<MessagingModuleSocket  name="mario" targetName="dragos" socket={socket}/>)

        fireEvent.change(getByPlaceholderText("Enter message text"),{target:{value:"Hello My Dear"}})
        fireEvent.click(getByText("Send"))
        expect(getByText("Hello My Dear")).toBeVisible()
    })

    it("Message Recieved is visible", ()=>{

       let messageReciever = new MockedSocket();
       let messageSender =messageReciever.socketClient
        const {getByText}= render(<MessagingModuleSocket  name="mario" targetName="dragos" socket={messageReciever}/>)
        messageSender.emit("text_message",{message:"I am genius",sender:"dragos",datetime:new Date().getTime()})
        expect(getByText("I am genius")).toBeVisible()
    })

})
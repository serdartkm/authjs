

import { h } from 'preact'
import {useState} from 'preact/hooks'
import { render, fireEvent,cleanup } from '@testing-library/preact'
import renderer from 'preact-render-to-string'
import MessageEditorDisplayer from '../index'

import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)


describe('MessageEditorDisplayer component', () => {

    it("Should render correctly", () => {
        const tree = renderer(MessageEditorDisplayer)
        expect(tree).toMatchSnapshot();
    })
    it('on user interaction message-editor behaves correctly',()=>{
        const MessageController =()=>{
          const [message,setMessage]=useState('')
          const sendMessage=()=>{
            setMessage('')
          }
          return(
            <MessageEditorDisplayer id={0} message={message} onMessageChange={(e)=>setMessage(e.target.value)} sendMessage={sendMessage} />
          )
        }
        const {getByPlaceholderText,getByTestId } = render( <MessageController  />,{})
        const messageTextInput =getByPlaceholderText(/Enter message text/i)
        const sendMessageButton =getByTestId('sendMessage0')
        expect(sendMessageButton).toBeDisabled()
        expect(messageTextInput.value).toBe('')
        fireEvent.input(messageTextInput,{ target: { value: 'hello' } })
        expect(messageTextInput.value).toBe('hello')
        expect(sendMessageButton).toBeEnabled()
        fireEvent.click(sendMessageButton)
        expect(messageTextInput.value).toBe('')
        expect(sendMessageButton).toBeDisabled()
    })
})

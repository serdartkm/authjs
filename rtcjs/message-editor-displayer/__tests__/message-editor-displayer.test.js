

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

    it("send Message button is disabled when message input is empty string",()=>{
    const {getByTestId } = render( <MessageEditorDisplayer message='' id={0}  />,{})
    // expect(getByTestId('sendMessage0')).toBeInTheDocument()
   //  const messageTextInput =getByPlaceholderText(/Enter message text/i)
     const sendMessageButton =getByTestId('sendMessage0')
        expect(sendMessageButton).toBeDisabled()
      //  fireEvent.input(messageTextInput, { target: { value: 'hello' } })
     //   expect(messageTextInput).toBeDisabled()
    })
    it('on message text input sendMessage button is enabled',()=>{
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
        fireEvent.input(messageTextInput,{ target: { value: 'hello' } })
        expect(messageTextInput.value).toBe('hello')
        expect(getByTestId('sendMessage0')).toBeEnabled()
    })


})

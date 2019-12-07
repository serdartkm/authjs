import { h } from 'preact'
import { useState } from 'preact/hooks'
import MessageEditorDisplayer from '../rtcjs/reusable-ui/message-editor-displayer'


export default {
    title: 'MessageEditorDisplayer'
}

function MessageHandler() {
    const [message, setMessage] = useState('')
    const textchange = (e) => setMessage(e.target.value)
    return (
        <MessageEditorDisplayer onMessageChange={textchange} message={message} sendMessage={() => { setMessage('') }} />
    )
}

export const editMessage = () => {

    return (<MessageHandler />)

}


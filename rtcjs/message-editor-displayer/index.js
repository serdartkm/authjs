'use strict';
import {h} from 'preact'

const MessageEditorDisplayer = ({ onMessageChange, message, sendMessage, style,id=0 }) => {
    return (
        <div style={{...style}} className="input-group">
       
            <input data-testid={`message${id}`} onKeyDown={(e) => { e.keyCode === 13 ? sendMesage() : null }} className='form-control' onChange={onMessageChange} value={message} name="message" type="text" placeholder="Enter message text" />
            <div className="input-group-append">
            <button data-testid={`sendMessage${id}`} disabled={message===""} style={{ marginLeft: 2 }} className="btn btn-secondary" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default MessageEditorDisplayer
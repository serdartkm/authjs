'use strict';
import React from 'react'


const MessageEditorDisplayer = ({ onMessageChange, message, sendMessage, style }) => {
    return (
        <div style={{...style}} className="input-group">
       
            <input onKeyDown={(e) => { e.keyCode === 13 ? sendMesage() : null }} className='form-control' onChange={onMessageChange} value={message} name="message" type="text" placeholder="Enter message text" />
            <div className="input-group-append">
            <button data-testid="sendMessage" disabled={message===""} style={{ marginLeft: 2 }} className="btn btn-secondary" onClick={sendMessage}>Send</button>
            </div>
           
           
        </div>
    )
}

export default MessageEditorDisplayer
'use strict';
import {h} from 'preact'

const MessageEditorDisplayer = ({ onMessageChange, message, sendMessage, style,id=0,disabled }) => {
    return (
        <div style={{...style,display:"flex"}} >
       
            <input style={{flex:1, padding:5}} data-testid={`message${id}`} onKeyDown={(e) => { e.keyCode === 13 ? sendMesage() : null }} className='form-control' onChange={onMessageChange} value={message} name="message" type="text" placeholder="Enter message text" />
            <div style={{width:100}} >
            <button   data-testid={`sendMessage${id}`} disabled={message===""||disabled} style={{ marginLeft: 2, padding:5, width:"100%" }}  onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default MessageEditorDisplayer
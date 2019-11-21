
import { h } from 'preact';

const MessageEditorDisplayer = ({
  onMessageChange, message, sendMessage, id = 0, disabled,
}) => (
  <div style={{ display: 'flex' }}>
    <input style={{ flex: 1 }} data-testid={`message${id}`} onInput={onMessageChange} value={message} name="message" type="text" placeholder="Enter message text" />
    <div style={{ display: 'flex' }}>
          <button data-testid={`sendMessage${id}`} disabled={message === '' || disabled} style={{ marginLeft: 2, width: '100%' }} onClick={sendMessage}>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
          </button>
    </div>
  </div>
);
export default MessageEditorDisplayer;

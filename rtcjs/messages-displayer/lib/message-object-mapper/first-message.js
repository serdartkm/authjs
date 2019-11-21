import {h} from 'preact'
import Message from './message-view'
import MessageAvatar from './message-avatar'

const FirstMessage = ({ message, datetime,letter,local }) => {

    return (

        <div style={{ display: "flex", alignItems: "center" }}>
            {!local &&<MessageAvatar letter={letter} />}
            <Message message={message} datetime={datetime} backgroundColor="#FFECB3" />
        </div>

    )
}

export default FirstMessage
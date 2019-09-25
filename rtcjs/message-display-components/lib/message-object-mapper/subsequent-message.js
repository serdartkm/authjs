import React from 'react'
import Message from './message-view'

const SubsequentMessage = ({ message, datetime }) => {

        return (

                <div style={{ display: "flex", alignItems: "center" }}>
                        <Message message={message} datetime={datetime} backgroundColor="#FFECB3" />
                </div>

        )
}

export default SubsequentMessage
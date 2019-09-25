import React from 'react'
import DateLine from './DateLine'
import Message from './message-object-mapper/message-view'
const SubMessageRight = ({ message, datetime, dateSpace,side }) => {

    return (
        <div>
            <div>{dateSpace && <DateLine datetime={datetime} />}</div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style ={{display:"flex", alignItems:"center"}}>
                    <Message datetime={datetime}  backgroundColor="#FFECB3">{message}</Message>    
                    </div>
            </div>
        </div>)
}

export default SubMessageRight
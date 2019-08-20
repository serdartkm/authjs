import React from 'react'
import DateLine from './DateLine'
import Message from './Message'
const SubMessageLeft = ({ message, datetime, dateSpace,side }) => {
    return (
        <div>
            <div>{dateSpace && <DateLine datetime={datetime} />}</div>
            <div style={{ display: "flex" }}>
            <div style ={{display:"flex", alignItems:"center",paddingLeft:40}}>
                    <Message datetime={datetime}  backgroundColor="#E6EE9C">{message}</Message>    
                     
                    </div>
                    
            </div>
        </div>)
}

export default SubMessageLeft
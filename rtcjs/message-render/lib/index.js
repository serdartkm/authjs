'use strict';
import React from 'react'

const messagesForRender = ({ messages, localSide, remoteSide }) => {
    let email = messages[0].from
    let lastDatetime = messages[0].datetime

    return messages.sort(function (a, b) {
        return a.datetime - b.datetime;
    }).map((m, i) => {
     
        if (i === 0 && m.local) {
            return { ...m, side: localSide, order: "F", dateSpace: true }
        }
        else if (i === 0 && !m.local) {
            return { ...m, side: remoteSide, order: "F", dateSpace: true }
        }
        //local messages
        else if (i > 0 && email === m.from && m.local) {
            if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
                email = m.from
                lastDatetime = m.datetime
                return { ...m, side: localSide, order: "S", dateSpace: true }
            }
            else {
                email = m.from
                lastDatetime = m.datetime
                return { ...m, side: localSide, order: "S", dateSpace: false }
            }

        }
        else if (i > 0 && email !== m.from && m.local) {
            if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
                email = m.from
                lastDatetime = m.datetime
                return { ...m, side: localSide, order: "F", dateSpace: false }
            } else {
                email = m.from
                lastDatetime = m.datetime
                return { ...m, side: localSide, order: "F", dateSpace: true }
            }
        }
        //remote messages
        else if (i > 0 && email === m.from && !m.local) {
          
            if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {

                lastDatetime = m.datetime
                return { ...m, side: remoteSide, order: "S", dateSpace: true }
            } else {
                lastDatetime = m.datetime
                return { ...m, side: remoteSide, order: "S", dateSpace: false }
            }
        }
        else if (i > 0 && email !== m.from && !m.local) {
          
            if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
                email = m.from
                lastDatetime = m.datetime
                return { ...m, side: remoteSide, order: "F", dateSpace: false }
            }
            else {
                email = m.from
                lastDatetime = m.datetime
                return { ...m, side: remoteSide, order: "F", dateSpace: true }
            }
        }
    })
}
const MessageRender = ({ messages, localSide = "Right", remoteSide = "Left", MessageContainer, FirstMessageLeft, FirstMessageRight, SubMessageLeft, SubMessageRight }) => {
    const messagesForView = messages.length>0 && messagesForRender({ messages, localSide, remoteSide })
  
    if (MessageContainer)
        return (<MessageContainer>{messages.length>0 && messagesForView.map((m, i) => {
          
            //Local
            if (m.local && m.order === "F" && m.side === "Left") {
                if (FirstMessageLeft)
                    return <FirstMessageLeft key={i} {...m} />
                return <div>FistMessageLeft not provided</div>
            }
            else if (m.local && m.order === "S" && m.side === "Left") {
                if (SubMessageLeft)
                    return <SubMessageLeft key={i} {...m} />
                return <div>SubMessageLeft not provided</div>
            }
            if (m.local && m.order === "F" && m.side === "Right") {
                if (FirstMessageRight)
                    return <FirstMessageRight key={i} {...m} />
                return <div>FistMessageRight not provided</div>
            }
            else if (m.local && m.order === "S" && m.side === "Right") {
                if (SubMessageRight)
                    return <SubMessageRight key={i} {...m} />
                return <div>SubMessageRight not provided</div>
            }
            //Remote
            else if (!m.local && m.order === "F" && m.side === "Right") {
                if (FistMessageRight)
                    return <FirstMessageRight key={i} {...m} />
                return <div>FirstMessageRight not provided</div>
            }
            else if (!m.local && m.order === "S" && m.side === "Right") {
                if (SubMessageRight)
                    return <SubMessageRight key={i} {...m} />
                return <div>SubMessageRight not provided</div>
            }
            else if (!m.local && m.order === "F" && m.side === "Left") {
                if (FirstMessageLeft)
                    return <FirstMessageLeft key={i} {...m} />
                return <div>FirstMessageLeft not provided</div>
            }
            else if (!m.local && m.order === "S" && m.side === "Left") {
                if (SubMessageLeft)
                    return <SubMessageLeft key={i} {...m} />
                return <div>SubMessageLeft not provided</div>
            }
            return <div>Render error</div>
        })}
        </MessageContainer>)

    return <div>MessageContainer not provided</div>

}


export default MessageRender
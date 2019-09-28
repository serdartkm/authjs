import React from 'react'

const MessageMapper =({messages,children, localSide="right",remoteSide="left"})=>{
    let email = messages[0].from
    let lastDatetime = messages[0].datetime
const messagesMapped =messages.map((m, i) => {
     
    if (i === 0 && m.local) {
      //  console.log("Loop one------")
        return { ...m, side: localSide, order: "F", dateSpace: true }
    }
    else if (i === 0 && !m.local) {
      //  console.log("Loop two------")
        return { ...m, side: remoteSide, order: "F", dateSpace: true,letter:m.from[0] }
    }
    //local messages
    else if (i > 0 && email === m.from && m.local) {
        if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
          //  console.log("Loop three------")
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "S", dateSpace: true }
        }
        else {
          //  console.log("Loop four------")
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "S", dateSpace: false }
        }

    }

    else if (i > 0 && email !== m.from && m.local) {
      
        if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
          //  console.log("Loop five------")
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "F", dateSpace: false }
        } else {
          //  console.log("Loop six------")
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "F", dateSpace: true }
        }
    }
    
    //remote messages
    else if (i > 0 && email === m.from && !m.local) {
      
        if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
           // console.log("Loop seven------")
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "S", dateSpace: true,letter:m.from[0] }
        } else {
          //  console.log("Loop eight------")
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "S", dateSpace: false,letter:m.from[0] }
        }
    }
    else if (i > 0 && email !== m.from && !m.local) {
      
        if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
           // console.log("Loop nine------")
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "F", dateSpace: false,letter:m.from[0] }
        }
        else {
           // console.log("Loop ten------")
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "F", dateSpace: true,letter:m.from[0] }
        }
    }
})
return children({messages:messagesMapped})
}
export default MessageMapper
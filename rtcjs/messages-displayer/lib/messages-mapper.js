import {h} from 'preact'

const MessageMapper =({messages,children, localSide="right",remoteSide="left"})=>{
  if(messages.length===0){
    return children({messages:[]})
  }
    let email = messages[0].from
    let lastDatetime = messages[0].datetime
const messagesMapped =messages.map((m, i) => {
  
    if (i === 0 && m.local) {
    
        return { ...m, side: localSide, order: "F", dateSpace: true }
    }
    if (i === 0 && !m.local) {
   
      const letter = m.from[0] !==undefined ? m.from[0]:""
        return { ...m, side: remoteSide, order: "F", dateSpace: true,letter }
    }
 
    if (i > 0 && email === m.from && m.local) {
        if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
        
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "S", dateSpace: true }
        }
        
        
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "S", dateSpace: false }
        

    }

    if (i > 0 && email !== m.from && m.local) {
      
        if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
       
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "F", dateSpace: false }
        } 
        
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: localSide, order: "F", dateSpace: true }
        
    }
    
  
    if (i > 0 && email === m.from && !m.local) {
      
        if (new Date(lastDatetime).getDate() !== new Date(m.datetime).getDate()) {
         
           const letter = m.from[0] !==undefined ? m.from[0]:""
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "S", dateSpace: true,letter }
        } 
        
          const letter = m.from[0] !==undefined ? m.from[0]:""
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "S", dateSpace: false,letter }
        
    }
    if (i > 0 && email !== m.from && !m.local) {
      
        if (new Date(lastDatetime).getDate() === new Date(m.datetime).getDate()) {
       
           const letter = m.from[0] !==undefined ? m.from[0]:""
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "F", dateSpace: false,letter }
        }
        
    
           const letter = m.from[0] !==undefined ? m.from[0]:""
            email = m.from
            lastDatetime = m.datetime
            return { ...m, side: remoteSide, order: "F", dateSpace: true,letter }
        
    }
    return null
})
return children({messages:messagesMapped})
}
export default MessageMapper
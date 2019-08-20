import withChatLog from './withChatLog'

const saveToLocalStorage =({message,key,onSave})=>{
    console.log(" JSON.parse(localStorage.getItem(key)) ", JSON.parse(localStorage.getItem(key)) )
    const messages = JSON.parse(localStorage.getItem(key)) ===null ? [message] :[...JSON.parse(localStorage.getItem(key)),message]
      console.log("msg=====",messages)
      localStorage.setItem(key, JSON.stringify(messages));
         //onSave({messages})
}

const loadFromStorage=({key,onLoad})=>{
    const messages = JSON.parse(localStorage.getItem(key)) ===null ? [] :[...JSON.parse(localStorage.getItem(key))]
    onLoad({messages})
}
export {
    saveToLocalStorage,
    loadFromStorage
}
export default withChatLog

const saveToLocalStorage = ({ message, key, onSave }) => {
    const messages = JSON.parse(localStorage.getItem(key)) === null ? [message] : [...JSON.parse(localStorage.getItem(key)), message]
    localStorage.setItem(key, JSON.stringify(messages));
    onSave({message})
}
const loadFromStorage = ({ key,onLoad }) => {
    const messages = JSON.parse(localStorage.getItem(key)) === null ? [] : [...JSON.parse(localStorage.getItem(key))]
    onLoad({messages})
}
export {
    saveToLocalStorage,
    loadFromStorage
}
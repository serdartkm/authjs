import {h} from 'preact'


const MessageView = ({ message, backgroundColor, datetime }) => {
  return (<div style={{
    backgroundColor,
    padding: 5,
    margin: 2,
    borderRadius: 15,
    borderColor: "#9E9E9E",
    borderStyle: "solid",
    borderWidth: 2,
    maxWidth: "100%",
    wordWrap: "break-word",
    wordBreak: "break-all",
    minWidth: "30%"
  }}>
    <div>{message}</div>
    <div style={{
      fontSize: 10,
      paddingTop: 2,
      textAlign: "end"
    }}><i style={{ backgroundColor: "#efebe9" }}>{new Date(datetime).toLocaleTimeString()}</i></div>
  </div>)
}

export default MessageView
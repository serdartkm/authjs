import {h} from 'preact'

const MessageAligner = ({ children, side, style }) => {
    const alignment = side === "left" ? "flex-start" : "flex-end"
    return <div style={{ display: "flex", justifyContent: alignment, ...style }}>{children}</div>
}


export default MessageAligner
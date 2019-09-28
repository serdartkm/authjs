import React from 'react'
const style = {

  backgroundColor: "#edeff2",
  overflow: "auto",
  width: "100%",
  flex: 10
};

class MessageViewScroller extends React.Component {

  componentWillReceiveProps() {
    this.gotoBottom()
  }

  componentDidUpdate() {
    this.gotoBottom()
  }

  gotoBottom() {
    var elements = document.getElementsByName("msgViewScroller");
    elements.forEach((e) => {
      e.scrollTop = e.scrollHeight - e.clientHeight;
    })

  }

  render() {
    const { children } = this.props
    return (<div name="msgViewScroller" style={style}>{children}</div>)
  }

}

export default MessageViewScroller
/* eslint-disable react/no-deprecated */
import {h, Component} from 'preact'



class MessageViewScroller extends Component {

  componentWillReceiveProps() {
    this.gotoBottom()
  }

  componentDidUpdate() {
    this.gotoBottom()
  }

  // eslint-disable-next-line class-methods-use-this
  gotoBottom () {
    const elements = document.getElementsByName("msgViewScroller");
    elements.forEach((e) => {
      e.scrollTop = e.scrollHeight - e.clientHeight;
    })

  }

  render() {
    const { children, style } = this.props
    return (
<div
  name="msgViewScroller"
  style={{
      backgroundColor: "#edeff2",
      overflow: "auto",
      width: "100%",
      height: "100%", ...style
    }}
>
{children}

</div>
)
  }

}

export default MessageViewScroller
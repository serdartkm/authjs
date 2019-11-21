import { h } from 'preact';

const style = {
  height: 30,
  width: 40,
  padding: 3,
  borderRadius: 30,
  backgroundColor: 'darkSmoke',
  borderStyle: 'solid',
  borderWidth: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#009688',
  borderColor: '#80cbc4',
};


const MessageAvatar = ({ letter = 'U' }) => (<div style={style}><div>{letter.toUpperCase()}</div></div>);

export default MessageAvatar;

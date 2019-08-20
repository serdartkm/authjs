import ScriptTagContainer from 'script-tag-container';

const firebaseApp = {
  url: 'https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js',
  integrity: '',
  crossorigin: '',
};

const firebaseAuth = {
  url: 'https://www.gstatic.com/firebasejs/5.10.1/firebase-auth.js',
  integrity: '',
  crossorigin: '',
};

const firebaseDatabase = {
  url: 'https://www.gstatic.com/firebasejs/5.10.1/firebase-database.js',
  integrity: '',
  crossorigin: '',
};

class FirebaseScriptLoader extends React.Component {
  render() {
    return (
      <ScriptTagContainer url={firebaseApp}>
        <ScriptTagContainer url={firebaseAuth}>
          <ScriptTagContainer url={firebaseDatabase}>
            {this.props.children}
          </ScriptTagContainer>
        </ScriptTagContainer>
      </ScriptTagContainer>
    );
  }
}

export default FirebaseScriptLoader;

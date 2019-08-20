import React from "react";

const withChatLog = ComposedComponent =>
  class extends React.Component {
    state = { messages: [], archivedMessages: [] };

    componentWillMount() {}

    getLocalMessages = key => {
      if (JSON.parse(localStorage.getItem(key)) !== null) {
        this.setState({ messages: JSON.parse(localStorage.getItem(key)) });
      }
    };

    getArchivedMessages = () => {};

    saveToLocalStorage = (m,key) => {
 console.log("m", m)
 console.log("key", key)
      this.setState((state, props) => ({
        messages: [...state.messages, m]
      }));

      localStorage.setItem(key, JSON.stringify(m));
    };



    removeFromLocalStorage = id => {};

    archiveMessages = () => {};

    render() {
      const { messages } = this.state;


      return (
        <ComposedComponent
          {...this.props}
          getLocalMessages={this.getLocalMessages}
          messages={messages}
          saveToLocalStorage={this.saveToLocalStorage}
   
          removeFromLocalStorage={this.removeFromLocalStorage}
          archiveMessages={this.archiveMessages}
          getArchivedMessages={this.getArchivedMessages}
        />
      );
    }
  };

export default withChatLog;

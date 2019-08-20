// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import PropTypes from "prop-types";
export const ContactContext = React.createContext();
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], connected: false };
  }

  componentDidMount() {
    this.socket = this.props.socket;

    this.socket("delayed_invitation", contact => {
      this.socket("delayed_invitation", contact);
    });
  }

  findContact = filter => {
    this.socket.emit("find_contact", filter);
  };

  addContact = contact => {
    this.socket.emit("add_contact", contact);
  };

  deleteContact = contact => {
    this.socket.emit("delete_contact", contact);
  };

  inviteContact = contact => {
    this.socket.emit("invite_contact", contact);
  };

  acceptInvitation = contact => {
    this.socket.emit("accept_invitation", contact);
  };

  declineInvitation = contact => {
    this.socket.emit("accept_invitation", contact);
  };

  blockContact = contact => {
    this.socket.emit("block_contact", contact);
  };

  archiveContact = contact => {
    this.socket.emit("archive_contact", contact);
  };

  getContacts = () => {
    this.socket.emit("get_contacts");
  };

  render() {
    const { children } = this.props;
    return (
      <ContactContext.Provider
        value={{
          findContact: this.findContact,
          addContact: this.addContact,
          deleteContact: this.deleteContact,
          inviteContact: this.inviteContact,
          acceptInvitation: this.acceptInvitation,
          declineInvitation: this.declineInvitation,
          blockContact: this.blockContact,
          archiveContact: this.archiveContact,
          getContacts: this.getContacts
        }}
      >
        {children}
      </ContactContext.Provider>
    );
  }
}

Contacts.propsTypes = {
  socket: PropTypes.object.isRequired
};

export default Contacts;

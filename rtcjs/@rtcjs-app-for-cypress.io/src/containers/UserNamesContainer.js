import React, { Component } from 'react';
import UserNamesComponent from '../components/UserNamesComponent';

class UserNamesContainer extends Component {
  state = { userNames: [] };

  componentDidMount() {
    firebase
      .database()
      .ref('usernames')
      .orderByChild('displayName')
      .on('child_added', data => {
        this.setState((state, props) => ({
          userNames: [...state.userNames, data.val()],
        }));
      });
  }

  selectUserName = e => {
    const name = e.target.id;
    this.props.setCallee(name);
  };

  render() {
    const { userNames } = this.state;
    const { onItemClick, selectCalleeName } = this.props;

    return (
      <div>
        {userNames && (
          <UserNamesComponent
            onClick={selectCalleeName}
            userNames={userNames}
          />
        )}
        {userNames.length === 0 && <div>Loading..</div>}
      </div>
    );
  }
}

export default UserNamesContainer;

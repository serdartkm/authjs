import React from 'react';
import ListItem from '../ListItem';

const UserNamesComponent = ({ userNames, onClick }) => (
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {userNames &&
      userNames.map((u, i) => (
        <ListItem
          name={u.displayName}
          onClick={() => onClick(u.displayName)}
          key={i}
          text={u.displayName}
        />
      ))}
  </ul>
);

export default UserNamesComponent;

import React, { Component } from 'react';

class ListItem extends Component {
  state = { itemHovered: false };

  toggleColor = () => {
    this.setState((state, props) => ({ itemHovered: !state.itemHovered }));
  };

  render() {
    const { onClick, text, name } = this.props;
    const { itemHovered } = this.state;
    return (
      <li
        name={name}
        id={name}
        onClick={onClick}
        onMouseLeave={() => this.toggleColor()}
        onMouseOver={() => this.toggleColor()}
        style={{
          padding: 5,
          margin: 2,
          backgroundColor: itemHovered === true ? '#bbb5c3' : '#ede7f6',
        }}
      >
        {text}
      </li>
    );
  }
}

export default ListItem;

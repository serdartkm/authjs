import React from 'react';
import PropTypes from 'prop-types';
import guidGenerator from './idGenerator';

export class UserIDGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { clientOne: '', clientTwo: '' };
  }

  componentDidMount() {
    this.setState({ clientOne: guidGenerator(), clientTwo: guidGenerator() });
  }

  render() {
    const { clientOne, clientTwo } = this.state;
    const { children } = this.props;
    return <div>{children({ clientOne, clientTwo })}</div>;
  }
}
UserIDGenerator.propTypes = {
  children: PropTypes.func.isRequired,
};
export default UserIDGenerator;

import React from 'react';
import PropTypes from 'prop-types';

const ShareScreenBtn = ({ onClick, fill = 'none' }) => (
  <button type="button" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        fill={fill}
        d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.11-.9-2-2-2H4c-1.11 0-2 .89-2 2v10c0 1.1.89 2 2 2H0v2h24v-2h-4zm-7-3.53v-2.19c-2.78 0-4.61.85-6 2.72.56-2.67 2.11-5.33 6-5.87V7l4 3.73-4 3.74z"
      />
    </svg>
  </button>
);
ShareScreenBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  fill: PropTypes.string.isRequired,
};
export default ShareScreenBtn;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {any} props
 * @returns
 */

const UserCard = (props) => {
  const { firstName, lastName, email, id, roleId, createdAt, onClick } = props;
  return (
    <div>
      <h5>{firstName}</h5>
      <h5>{lastName}</h5>
      <h5>{email}</h5>
      <p>{roleId}</p>
      <p>{createdAt}</p>
      <button
        className="btn btn-default"
        onClick={onClick}
        value={id}
      >
        View Headlines
      </button>
    </div>
  );
};

// Set Default Props
UserCard.defaultProps = {
  title: '',
  content: '',
  id: ''
};
// Set Props
UserCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  roleId: PropTypes.number.isRequired,
  createdAt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default UserCard;

import React from 'react';
import PropTypes from 'prop-types';
import parseDate from '../../utilities/parseDate';

/**
 * @param {any} props
 * @returns
 */

const UserCard = (props) => {
  const { firstName, lastName, email, Role, id, createdAt, onClick } = props;
  return (
    <div>
      <a
        onClick={onClick}
        name={id}
        className="truncate"
        href="#!">{firstName} {lastName}</a>
      <p>{email}</p>
      {(Role.title === 'regularuser') && <p>Regular User</p>}
      {(Role.title === 'contributor') && <p>Contributor</p>}
      <p>Joined at: {parseDate(createdAt)}</p>
      <div className="divider" />
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
  Role: PropTypes.object.isRequired,
  createdAt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default UserCard;

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
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  Role: PropTypes.object,
  createdAt: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number
};

export default UserCard;

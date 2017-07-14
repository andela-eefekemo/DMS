import React from 'react';
import PropTypes from 'prop-types';
import parseDate from '../../utilities/parseDate';

/**
 * @param {any} props
 * @returns
 */

const DocumentCard = (props) => {
  const { title, id, access, updatedAt, onClick, User } = props;
  return (
    <div>
      <a
        onClick={onClick}
        name={id}
        className="truncate"
        href="#!">{title}</a>
      <p>By {User.firstName} {User.lastName}</p>
      {(access === 'public') && <p>Public</p>}
      {(access === 'private') && <p>Private</p>}
      {(access === 'role') && <p>Role</p>}
      <p>Last Edited: {parseDate(updatedAt)}</p>
      <div className="divider" />
    </div>
  );
};

// Set Props
DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  User: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  updatedAt: PropTypes.node.isRequired
};

export default DocumentCard;

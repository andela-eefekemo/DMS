import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import InputField from '../common/InputField';

/**
 * @param {any} props
 * @returns
 */

const RoleCard = (props) => {
  const {
    title, id, description, createdAt, onChange, onSubmit, deleteRole } = props;
  return (
    <div>
      <h5>{title}</h5>
      <h5>{description}</h5>
      <p>{createdAt}</p>
      <button
        className="waves-effect btn button-design"
        onClick={deleteRole}
        value={id}
      >
        Delete
      </button>
      <Modal
        trigger={
          <a
            className="waves-effect btn button-design"
            data-target="passwordModal">
            Update
          </a>
        }
      >
        <form onSubmit={onSubmit} >
          <h5>Update User</h5>
          <InputField
            name="title"
            value={title}
            placeholder="Document firstName"
            className="validate form-design"
            type="text"
            onChange={onChange} />
          <InputField
            name="description"
            value={description}
            placeholder="Document lastName"
            className="validate form-design"
            type="text"
            onChange={onChange} />
          <div className="input-field center">
            <button className="waves-effect btn button-design" type="submit">
              Update
            </button>
          </div>

        </form>
      </Modal>
    </div>
  );
};

// Set Props
RoleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default RoleCard;

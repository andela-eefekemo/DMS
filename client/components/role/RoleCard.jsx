import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import InputField from '../common/InputField';
import parseDate from '../../utilities/parseDate';

/**
 * @param {any} props
 * @returns
 */

const RoleCard = ({
    title, id, description, updatedAt, onChange, onSubmit, deleteRole }) => {
  return (
    <div>
      <div>
        <h5>{title}</h5>
        <p>{description}</p>
        <p>Last Edited: {parseDate(updatedAt)}</p>
        <p />
        <p />
        <div className="col l6 m6 s12 left">
          <Modal
            trigger={
              <a
                className="waves-effect btn button-design"
                data-target="passwordModal" id="delete-role">
                Delete
                </a>}
            actions={
              <div>
                <button
                  className="btn btn-flat modal-action modal-close"
                  name={id} onClick={deleteRole}
                  id="delete">
                  Delete
                </button>
                <button
                  className="btn btn-flat modal-action modal-close left">
                  Cancel
                  </button>
              </div>}>
            <div >
              <h5
                className="center">
                Are you sure you want to delete the user
                </h5>
            </div>
          </Modal>
        </div>
        <div className="col l6 m6 s12 right">
          <Modal
            trigger={
              <a
                className="waves-effect btn button-design"
                data-target="passwordModal">
                Update
          </a>
            }
          >
            <div>
              <h5>Update Role</h5>
              <InputField
                name="title"
                placeholder={title}
                className="validate form-design"
                type="text"
                onChange={onChange} />
              <InputField
                name="description"
                placeholder={description}
                className="validate form-design"
                type="text"
                onChange={onChange} />
              <div className="input-field center">
                <button
                  className="btn button-design modal-action modal-close"
                  type="submit"
                  onClick={onSubmit}
                  name={id}>
                  Update
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div >
  );
};

// Set Props
RoleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default RoleCard;

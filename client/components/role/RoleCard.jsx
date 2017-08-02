import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import InputField from '../common/InputField';
import parseDate from '../../utilities/parseDate';

/**
* Role Card for viewing a single user
*
* @param {Object} props { title, id, description,
*  updatedAt, onChange, onSubmit, deleteRole }
* @returns {String} HTML markup for the Role Card
*/
const RoleCard = ({
    title, id, description, updatedAt, onChange, onSubmit, deleteRole }) => (
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
              data-target="passwordModal"
              id="update-role">
              Update
          </a>
          }
          actions={
            <div>
              <button
                className="btn btn-flat modal-action modal-close"
                type="submit"
                onClick={onSubmit}
                name={id}
                id="update">
                Update
                </button>
              <button
                className="btn btn-flat modal-action modal-close left">
                Cancel
                  </button>
            </div>}>
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
          </div>
        </Modal>
      </div>
    </div>
  );

// Set Props
RoleCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  updatedAt: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  deleteRole: PropTypes.func,
  id: PropTypes.number
};

export default RoleCard;

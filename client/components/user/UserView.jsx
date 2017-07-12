import React from 'react';
import { Modal } from 'react-materialize';

const UserView = ({ id, firstName, lastName, email, deleteUser }) => {
  return (
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{firstName} {lastName}</span>
        <div>{email}</div>
      </div>
      <div className="card-action">
        <div className="row">
          <div className="col l12 m12 s12">
            <Modal
              trigger={
                <a
                  className="waves-effect btn button-design"
                  data-target="passwordModal">
                  Delete
                </a>}
              actions={
                <div>
                  <button className="btn waves-effect waves-light btn-flat modal-action modal-close" name={id} onClick={deleteUser}>
                    Delete
                </button>
                  <button className="btn waves-effect waves-light btn-flat modal-action modal-close left">Cancel</button>
                </div>}>
              <div >
                <h5 className="center">Are you sure you want to delete the user</h5>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;

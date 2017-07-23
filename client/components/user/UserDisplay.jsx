import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';

import InputField from '../common/InputField';
/**
 * User Display component for creating a document
 *
 * @param {Object} props { onSubmit, onChange, firstName, lastName, email }
 * @returns {String} HTML markup for the User Display
 */
const UserDisplay = (
  { onSubmit, onChange, firstName, lastName, email }) => {
  return (
    <div className="document-form">
      <div className="center hover">
        <div className="card">
          <h5 className="center"> User Profile </h5>
          <div className="row profile">
            <div className="col l8 m8 s12">
              <InputField
                name="firstName"
                value={firstName}
                placeholder="First Name"
                className="validate form-design"
                type="text" onChange={onChange} />
            </div>
            <div className="col l8 m8 s12">
              <InputField
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                className="validate form-design"
                type="text" onChange={onChange} />
            </div>
            <div className="col l8 m8 s12">
              <InputField
                name="email"
                value={email}
                placeholder="Email"
                className="validate form-design"
                type="email" onChange={onChange} />
            </div>
          </div>
          <div className="row user-action">
            <div className="col l6 m6 s12 input-field center">
              <Modal
                trigger={
                  <a
                    id="update-password"
                    className="waves-effect btn button-design"
                    data-target="passwordModal">
                    Change Password
                  </a>
                }
              >
                <div>
                  <h5 className="center"> Set Password</h5>
                  <div className="row">
                    <div className="col l12 m12 s12">
                      <InputField
                        name="oldPassword"
                        placeholder="Old Password"
                        className="validate form-design"
                        type="password" onChange={onChange} />
                      <InputField
                        name="password"
                        placeholder="Password"
                        className="validate form-design"
                        type="password" onChange={onChange} />
                    </div>
                    <div className="col l12 m12 s12">
                      <InputField
                        name="confirmPassword"
                        placeholder="Re-Type Password"
                        className="validate form-design"
                        type="password" onChange={onChange} />
                    </div>
                  </div>
                  <div className="center">
                    <button
                      id="password-button"
                      className="btn button-design modal-action modal-close"
                      type="submit" onClick={onSubmit}>
                      Save
                  </button>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="col l6 m6 s12 input-field center">
              <button
                id="update-button"
                className="waves-effect btn button-design"
                type="submit" onClick={onSubmit} >
                Save
              </button>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

UserDisplay.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default UserDisplay;

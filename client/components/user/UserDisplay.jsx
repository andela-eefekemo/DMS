import React from 'react';

import InputField from '../common/InputField';

const UserDisplay = (
  { onSubmit, onChange, user, updatedPassword, changePassword }) => {
  return (
    <div>
      <div className="user-card card">
        <div className="card-content">
          <p></p>
        </div>
        <form onSubmit={onSubmit} >
          <h5 className="center"> User Profile </h5>
          <div className="row profile">
            <div className="col l8 m8 s12">
              <InputField
                name="firstName"
                value={user.firstName}
                placeholder="First Name"
                className="validate form-design"
                type="text" onChange={onChange} />
            </div>
            <div className="col l8 m8 s12">
              <InputField
                name="lastName"
                value={user.lastName}
                placeholder="Last Name"
                className="validate form-design"
                type="text" onChange={onChange} />
            </div>
            <div className="col l8 m8 s12">
              <InputField
                name="email"
                value={user.email}
                placeholder="Email"
                className="validate form-design"
                type="email" onChange={onChange} />
            </div>
          </div>
          <div className="row user-action">
            <div className="col l6 m6 s12 input-field center">
              <button
                className="waves-effect btn button-design"
                data-target="passwordModal">
                Change Password
            </button>
            </div>
            <div className="col l6 m6 s12 input-field center">
              <button className="waves-effect btn button-design" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div id="passwordModal" className="modal">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <h5 className="center"> Set Password</h5>
            <div className="row">
              <div className="col l12 m12 s12">
                <InputField
                  name="password"
                  value={updatedPassword.password}
                  placeholder="Password"
                  className="validate form-design"
                  type="password" onChange={changePassword} />
              </div>
              <div className="col l12 m12 s12">
                <InputField
                  name="confirmPassword"
                  value={updatedPassword.changePassword}
                  placeholder="Re-Type Password"
                  className="validate form-design"
                  type="password" onChange={changePassword} />
              </div>
            </div>
            <div className="center">
              <button className="waves-effect btn button-design" type="submit">
                Save
            </button>
            </div>
            <a
              href="#!"
              className="modal-action modal-close waves-effect btn-flat">
              Cancel</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDisplay;

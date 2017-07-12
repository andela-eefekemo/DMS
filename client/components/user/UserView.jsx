import React from 'react';
import { Modal } from 'react-materialize';
import InputField from '../common/InputField';
import Dropdown from '../common/Dropdown';

const UserView = ({ id, firstName, lastName, email, roleId, roles, onSubmit, onChange, deleteUser }) => {
  const roleOptions = roles.map(role => <Dropdown value={role.id} key={role.id} text={role.title} />);
  return (
    <div>
      <h5>{firstName}</h5>
      <p>{lastName}</p>
      <p>{email}</p>
      <p>{roleId}</p>
      <button
        className="waves-effect btn button-design"
        onClick={deleteUser}
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
            name="firstName"
            value={firstName}
            placeholder="Document firstName"
            className="validate form-design"
            type="text" />
          <InputField
            name="lastName"
            value={lastName}
            placeholder="Document lastName"
            className="validate form-design"
            type="text" />
          <select
            name="access"
            className="browser-default input-field select" onChange={onChange}>
            <Dropdown value={2} text="Regular User" />
            {roleOptions}
          </select>
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

export default UserView;

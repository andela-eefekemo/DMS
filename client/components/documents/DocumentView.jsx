import React from 'react';
import { Modal } from 'react-materialize';
import ReactHtmlParser from 'react-html-parser';
import InputField from '../common/InputField';
import Dropdown from '../common/Dropdown';

const DocumentView = (props) => {
  const {
    id,
    title,
    content,
    access, onSubmit, onChange, deleteDocument, userId, authorId } = props;
  return (
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{title}</span>
        <div>{ReactHtmlParser(content)}</div>
        <p>{access}</p>
      </div>
      <div className="card-action">
        <div className="row">
          <div className="col l6 m6 s12">
            {userId === authorId && <Modal
              trigger={
                <a
                  className="waves-effect btn button-design"
                  data-target="passwordModal">
                  Delete
                </a>}
              actions={
                <div>
                  <button className="btn waves-effect waves-light btn-flat modal-action modal-close" name={id} onClick={deleteDocument}>
                    Delete
                </button>
                  <button className="btn waves-effect waves-light btn-flat modal-action modal-close left">Cancel</button>
                </div>}>
              <div >
                <h5 className="center">Are you sure you want to delete the user</h5>
              </div>
            </Modal>
            }
          </div>
          <div className="col l6 m6 s12">
            {userId === authorId && <Modal
              trigger={
                <a
                  className="waves-effect btn button-design"
                  data-target="passwordModal">
                  Update
          </a>
              }
            >
              <div >
                <h5>Create Document</h5>
                <InputField
                  name="title"
                  value={title}
                  placeholder="Document Title"
                  className="validate form-design"
                  type="text" onChange={onChange} />
                <InputField
                  name="content"
                  value={content}
                  placeholder="Document Content"
                  className="validate form-design"
                  type="text" onChange={onChange} />
                <select
                  name="access"
                  className="browser-default input-field select" onChange={onChange}>
                  <Dropdown value="" text="Select access type" />
                  <Dropdown value="public" text="Public" />
                  <Dropdown value="private" text="Private" />
                  <Dropdown value="role" text="Role" />
                </select>
                <div className="input-field center">
                  <button className="waves-effect modal-action modal-close btn button-design" type="submit" onClick={onSubmit}>
                    Update
            </button>
                </div>

              </div>
            </Modal>}
          </div>
        </div>
      </div>
    </div>

  );
};

export default DocumentView;

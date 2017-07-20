import React from 'react';
import { Modal } from 'react-materialize';
import ReactHtmlParser from 'react-html-parser';
import TinyMCE from 'react-tinymce';
import PropTypes from 'prop-types';

import InputField from '../common/InputField';
import Dropdown from '../common/Dropdown';

const DocumentView = (props) => {
  const {
    id,
    title,
    content,
    access,
    onSubmit,
    onChange,
    getContent,
    deleteDocument,
    userId,
    authorId } = props;
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
                  data-target="passwordModal" id="delete-document">
                  Delete
                </a>}
              actions={
                <div>
                  <button
                    className="btn btn-flat modal-action modal-close"
                    name={id} onClick={deleteDocument}
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
            }
          </div>
          <div className="col l6 m6 s12">
            {userId === authorId && <Modal
              trigger={
                <a
                  className="waves-effect btn button-design"
                  data-target="passwordModal"
                  id="update-document"
                >
                  Update
                </a>
              }
              actions={
                <div>
                  <button
                    id="save-update"
                    className="modal-action modal-close btn btn-flat"
                    onClick={onSubmit}>
                    Update
                      </button>
                  <button
                    className="btn btn-flat modal-action modal-close left">
                    Cancel
                      </button>
                </div>
              }>
              <div >
                <h5>Update Document</h5>
                <InputField
                  name="title"
                  value={title}
                  placeholder="Document Title"
                  className="validate form-design"
                  type="text" onChange={onChange} />
                <TinyMCE
                  content={content}
                  config={{
                    plugins: 'link image code',
                    height: 200,
                    toolbar:
                    'undo redo | bold italic | alignleft aligncenter alignright | code'
                  }}
                  onChange={getContent}
                />
                <select
                  name="access"
                  value={access}
                  className="browser-default input-field select"
                  onChange={onChange}>
                  <Dropdown value="" text="Select access type" />
                  <Dropdown value="public" text="Public" />
                  <Dropdown value="private" text="Private" />
                  <Dropdown value="role" text="Role" />
                </select>
              </div>
            </Modal>}
          </div>
        </div>
      </div>
    </div>
  );
};

DocumentView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  id: PropTypes.number,
  userId: PropTypes.number,
  authorId: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  access: PropTypes.string
};

export default DocumentView;

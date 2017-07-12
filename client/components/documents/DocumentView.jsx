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
            {userId === authorId && <button
              className="waves-effect btn button-design"
              onClick={deleteDocument}
              value={id}
            >
              Delete
      </button>
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
              <form onSubmit={onSubmit} >
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
                  <button className="waves-effect btn button-design" type="submit">
                    Update
            </button>
                </div>

              </form>
            </Modal>}
          </div>
        </div>
      </div>
    </div>

  );
};

export default DocumentView;

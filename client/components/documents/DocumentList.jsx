import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentActions from '../../actions/DocumentActions';

const getAllDocuments = DocumentActions.getAllDocuments;

class DocumentList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllDocuments()
      .then(() => {
        
      }).catch(() => {

      });
  }
}

const mapPropsToState = () => {
  return {
    document: state.document
  };
};

export default connect(mapPropsToState)(DocumentList);

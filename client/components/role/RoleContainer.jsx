import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import RoleDisplay from './RoleDisplay';
import RoleActions from '../../actions/RoleActions';
import validate from '../../utilities/validate';

const createRole = RoleActions.createRole;

/**
 * @class RoleContainer
 * @extends {Component}
 */
export class RoleContainer extends Component {
  /**
   * Creates an instance of RoleContainer.
   * Binds the functions to the class
   * @param {Object} props
   * @memberof RoleContainer
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
  * Validates the RoleDisplay input fields
  * Makes an action call to create a new role
  * Toasts the error/success message
  *
  * @return {void}
  * @memberof RoleContainer
  */
  onSubmit() {
    try {
      const { valid } = validate.validateSaveRole(this.state);
      if (!valid) {
        throw new Error('No field should be left blank');
      }
      this.props.createRole(this.state)
        .then(() => {
          if (this.props.role.message) {
            return Materialize.toast(
              this.props.role.message,
              2000, 'indigo darken-4 white-text rounded');
          }
          Materialize.toast(
            'Role created', 2000, 'indigo darken-4 white-text rounded');
          this.props.history.push('/dashboard/allroles');
        });
    } catch (err) {
      Materialize.toast(err.message, 3000,
        'indigo darken-4 white-text rounded');
    }
  }
  /**
  * Sets the event value to the state
  * @return {void}
  * @param {Object} event The event of the HTML component
  * @memberof RoleContainer
  */
  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }


  /**
   * @returns {jsx} -
   * @memberof RoleContainer
   */
  render() {
    return (
      <RoleDisplay
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        role={this.state} />
    );
  }
}

const mapPropsToState = (state) => {
  return {
    role: state.role
  };
};

RoleContainer.propTypes = {
  createRole: PropTypes.func.isRequired,
  role: PropTypes.object,
  history: PropTypes.object
};

export default connect(
  mapPropsToState, { createRole })(withRouter(RoleContainer));

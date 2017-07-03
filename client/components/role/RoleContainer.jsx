import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RoleDisplay from './RoleDisplay';
import RoleActions from '../../actions/RoleActions';
import validate from '../../utilities/validate';

const createRole = RoleActions.createRole;

/**
 * @class RoleContainer
 * @extends {Component}
 */
class RoleContainer extends Component {
  /**
   * Creates an instance of RoleContainer.
   * @param {any} props -
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
   * @return {void}
   * @param {any} e -
   * @memberof RoleContainer
   */
  onSubmit(e) {
    e.preventDefault();
    try {
      if (!validate(this.state)) {
        throw new Error('No field should be left blank');
      }
      this.props.createRole(this.state)
        .then(() => {
          console.log(this.props.role);
          if (this.props.role.message) {
            return Materialize.toast(this.props.role.message, 2000, 'indigo darken-4 white-text rounded');
          }
          Materialize.toast(
            'Success!', 2000, 'indigo darken-4 white-text rounded');
          this.context.router.history.push('/dashboard');
        });
    } catch (err) {
      Materialize.toast(err.message, 3000,
        'indigo darken-4 white-text rounded');
    }
  }
  /**
   * @return {void}
   * @param {any} e -
   * @memberof RoleContainer
   */
  onChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
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
  createRole: PropTypes.func.isRequired
};

RoleContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapPropsToState, { createRole })(RoleContainer);

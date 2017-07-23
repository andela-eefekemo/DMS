import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserActions from '../../actions/UserActions';

import validate from '../../utilities/validate';
import UserDisplay from './UserDisplay';

const updateUser = UserActions.updateUser;
const viewUser = UserActions.viewUser;
/**
 * @class UserContainer
 * @extends {Component}
 */
export class UserContainer extends Component {
  /**
   * Creates an instance of UserContainer.
   * Binds the functions to the class
   * @param {Object} props
   * @memberof UserContainer
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      roleId: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Makes an action call to get the current user information
   * Sets user information to the state
   * Initializes materialize modal
   *
   * @return {void}
   * @memberof UserContainer
   */
  componentDidMount() {
    this.props.viewUser(this.props.access.user.id)
      .then(() => {
        this.setState({
          firstName: this.props.user.user.firstName,
          lastName: this.props.user.user.lastName,
          email: this.props.user.user.email,
          roleId: this.props.user.user.roleId
        });
      });
    $('.modal').modal();
  }
  /**
  * Validates the UserDisplay input fields
  * Makes an action call to update user profile
  * Toasts the error/success message
  *
  * @return {void}
  * @memberof UserContainer
  */
  onSubmit() {
    try {
      const { valid } = validate.validateUpdateUser(this.state);
      if (!valid) {
        throw new Error('No field should be left blank');
      }
      this.props.updateUser(this.state, this.props.access.user.id)
        .then(() => {
          if (this.props.user.message) {
            return Materialize.toast(
              this.props.user.message, 2000,
              'indigo darken-4 white-text rounded');
          }
          Materialize.toast(
            'Profile updated!', 2000, 'indigo darken-4 white-text rounded');
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
  * @memberof UserContainer
  */
  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }

  /**
  * Renders the User component
  * @returns {String} The HTML markup for the User
  * @memberof UserContainer
  */
  render() {
    return (
      <UserDisplay
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        email={this.state.email}
        onChange={this.onChange}
        onSubmit={this.onSubmit} />
    );
  }
}

const mapPropsToState = (state) => {
  return {
    access: state.access,
    user: state.user
  };
};

UserContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

UserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  viewUser: PropTypes.func.isRequired
};


export default connect(
  mapPropsToState, { updateUser, viewUser })(withRouter(UserContainer));

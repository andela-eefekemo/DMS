import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserDisplay from './UserDisplay';
/**
 * @class UserContainer
 * @extends {Component}
 */
class UserContainer extends Component {
  /**
   * Creates an instance of ProfileContainer.
   * @param {any} props -
   * @memberof ProfileContainer
   */
  constructor(props) {
    super(props);
    this.state = {
      updatedInfo: {
        firstName: this.props.access.user.firstName,
        lastName: this.props.access.user.lastName,
        email: this.props.access.user.email,
      },
      updatedPassword: {
        password: '',
        confirmPassword: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }


  /**
   * @return {void}
   * @memberof UserContainer
   */
  componentDidMount() {
    $('.modal').modal();
  }
  /**
 * @return {void}
 * @param {any} e -
 * @memberof UserContainer
 */
  onSubmit(e) {
    e.preventDefault();
    // try {
    //   if (!validate(this.state)) {
    //     throw new Error('No field should be left blank');
    //   }
    // this.props.signUpUser(this.state)
    //     .then(() => {
    //       Materialize.toast('Success!', 2000, 'indigo darken-4 white-text rounded');
    //       this.context.router.history.push('/dashboard');
    //     });
    // } catch (err) {
    //   Materialize.toast(err.message, 3000,
    //     'indigo darken-4 white-text rounded');
    // }
  }

  /**
   * @return {void}
   * @param {any} e -
   * @memberof UserContainer
   */
  onChange(e) {
    const field = e.target.name;
    this.setState({ updatedInfo: { [field]: e.target.value } });
  }

  /**
   * @return {void}
   * @param {any} e 
   * @memberof UserContainer
   */
  changePassword(e) {
    const field = e.target.name;
    this.setState({ updatedPassword: { [field]: e.target.value } });
  }

  /**
   * @returns {jsx} -
   * @memberof UserContainer
   */
  render() {
    return (
      <UserDisplay
        user={this.state.updatedInfo}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        changePassword={this.changePassword}
        updatedPassword={this.state.updatedPassword} />
    );
  }
}

const mapPropsToState = (state) => {
  return {
    access: state.access
  };
};

UserContainer.propTypes = {
  access: PropTypes.object.isRequired
};


export default connect(mapPropsToState)(UserContainer);

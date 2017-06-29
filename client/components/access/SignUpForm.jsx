import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AccessActions from '../../actions/AccessActions';
import InputField from '../common/InputField';
import validate from '../../utilities/validate';


const signUpUser = AccessActions.signUpUser;
/**
 * @class SignUpForm
 * @extends {Component}
 */
class SignUpForm extends Component {
  /**
   * Creates an instance of SignUpForm.
   * @param {any} props
   * @param {any} context
   * @memberof SignUpForm
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @return {void}
   * @param {any} e -
   * @memberof SignUpForm
   */
  onSubmit(e) {
    e.preventDefault();
    try {
      if (!validate(this.state)) {
        throw new Error('No field should be left blank');
      }
      this.props.signUpUser(this.state)
        .then(() => {
          debugger;
          Materialize.toast('Success!', 2000, 'indigo darken-4 white-text rounded');
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
   * @memberof SignUpForm
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @returns {jsx} -
   * @memberof SignUpForm
   */
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h5 className="center"> Join our Community!</h5>
        <div className="row">
          <div className="col l6 m6 s12">
            <InputField
              name="firstName"
              value={this.state.firstName}
              label="First Name"
              className="validate form-design"
              type="text" onChange={this.onChange} />
          </div>
          <div className="col l6 m6 s12">
            <InputField
              name="lastName"
              value={this.state.lastName}
              label="Last Name"
              className="validate form-design"
              type="text" onChange={this.onChange} />
          </div>
          <div className="col l12 m12 s12">
            <InputField
              name="email"
              value={this.state.email}
              label="Email"
              className="validate form-design"
              type="email" onChange={this.onChange} />
          </div>
          <div className="col l12 m12 s12">
            <InputField
              name="password"
              value={this.state.password}
              label="Password"
              className="validate form-design"
              type="password" onChange={this.onChange} />
          </div>
          <div className="col l12 m12 s12">
            <InputField
              name="confirmPassword"
              value={this.state.confirmPassword}
              label="Re-Type Password"
              className="validate form-design"
              type="password" onChange={this.onChange} />
          </div>
        </div>
        <div className="input-field center">
          <button className="waves-effect btn button-design" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  signUpUser: PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { signUpUser })(SignUpForm);

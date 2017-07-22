import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import AccessActions from '../../actions/AccessActions';
import validate from '../../utilities/validate';


const signUpUser = AccessActions.signUpUser;
/**
 * @class SignUpForm
 * @extends {Component}
 */
export class SignUpForm extends Component {
  /**
   * Creates an instance of SignUpForm.
   * @param {Object} props
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);
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
  * Validates the SignUpForm
  * Makes an action call to sign up the user
  * Toasts the error/success message
  * @return {void}
  * @memberof SignUpForm
  */
  onSubmit() {
    try {
      const { valid } = validate.validateSignUp(this.state);
      if (!valid) {
        throw new Error('No field should be left blank');
      }
      this.props.signUpUser(this.state)
        .then(() => {
          if (this.props.access.message) {
            return Materialize.toast(this.props.access.message,
              2000, 'indigo darken-4 white-text rounded');
          }
          Materialize.toast('Welcome!',
            2000, 'indigo darken-4 white-text rounded');
          this.props.history.push('/dashboard');
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
  * @memberof SignUpForm
  */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
  * Renders the SignUpForm component
  * @returns {String} The HTML markup for the SignUpForm
  * @memberof SignUpForm
  */
  render() {
    return (
      <div>
        <h5 className="center"> Create an account </h5>
        <div className="row">
          <div className="col l6 m6 s12">
            <div className="input-field">
              <input
                className="validate form-design"
                name="firstName"
                value={this.state.firstName}
                placeholder="First Name"
                type="text" onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="col l6 m6 s12">
            <div className="input-field">
              <input
                name="lastName"
                value={this.state.lastName}
                placeholder="Last Name"
                className="validate form-design"
                type="text" onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="col l12 m12 s12">
            <div className="input-field">
              <input
                name="email"
                value={this.state.email}
                placeholder="Email"
                className="validate form-design"
                type="email" onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="col l12 m12 s12">
            <div className="input-field">
              <input
                name="password"
                value={this.state.password}
                placeholder="Password"
                className="validate form-design"
                type="password" onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="col l12 m12 s12">
            <div className="input-field">
              <input
                name="confirmPassword"
                value={this.state.confirmPassword}
                placeholder="Re-Type Password"
                className="validate form-design"
                type="password" onChange={this.onChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="input-field center">
          <button
            className="waves-effect btn button-design" id="signup-button"
            onClick={this.onSubmit}>
            Sign Up
          </button>
        </div>
        <p className="center">Have an account? <Link to="signin">Sign In</Link>
        </p>
      </div >
    );
  }
}

const mapPropsToState = (state) => {
  return {
    access: state.access
  };
};

SignUpForm.propTypes = {
  signUpUser: PropTypes.func,
  access: PropTypes.object.isRequired,
  history: PropTypes.object
};


export default connect(mapPropsToState, { signUpUser })(withRouter(SignUpForm));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import AccessActions from '../../actions/AccessActions';
import validate from '../../utilities/validate';

const signInUser = AccessActions.signInUser;
/**
 * @class SignInForm
 * @extends {Component}
 */
export class SignInForm extends Component {
  /**
  * Creates an instance of SignUpForm.
  * Binds the functions to the class
  * @param {Object} props -
  * @memberof SignInForm
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
  * Validates the SignInForm
  * Makes an action call to sign in the user
  * Toasts the error/success message
  * @return {void}
  * @memberof SignInForm
  */
  onSubmit() {
    try {
      const { valid } = validate.validateLogin(this.state);
      if (!valid) {
        throw new Error('No field should be left blank');
      }
      this.props.signInUser(this.state)
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
  * @memberof SignInForm
  */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
  * Renders the SignInForm component
  * @returns {String} The HTML markup for the SignInForm
  * @memberof SignInForm
  */
  render() {
    return (
      <div>
        <h5 className="center"> Log Into Doc-ms</h5>
        <div className="input-field">
          <input
            className="validate form-design"
            type="email"
            name="email"
            onChange={this.onChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-field">
          <input
            className="validate form-design"
            type="password"
            name="password"
            onChange={this.onChange}
            placeholder="password"
            required
          />
        </div>
        <div className="input-field center">
          <button
            id="submit-signin"
            className="waves-effect btn button-design" onClick={this.onSubmit}>
            Sign In
          </button>
        </div>
        <p className="center">
          Don&#39;t Have an account? <Link to="signup">Create an Account</Link>
        </p>
      </div>
    );
  }
}

const mapPropsToState = state => (
  {
    access: state.access
  }
);

SignInForm.propTypes = {
  signInUser: PropTypes.func.isRequired,
  access: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default connect(mapPropsToState, { signInUser })(withRouter(SignInForm));

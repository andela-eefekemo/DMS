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
 * @param {any} props -
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
   * @return {void}
   * @memberof SignInForm
   */
  onSubmit() {
    try {
      if (!validate(this.state)) {
        throw new Error('No field should be left blank');
      }
      this.props.signInUser(this.state)
        .then(() => {
          if (this.props.access.message) {
            return Materialize.toast(this.props.access.message,
              2000, 'indigo darken-4 white-text rounded');
          }
          Materialize.toast('Success!',
            2000, 'indigo darken-4 white-text rounded');
          this.props.history.push('/dashboard');
        });
    } catch (err) {
      Materialize.toast(err.message, 3000,
        'indigo darken-4 white-text rounded');
    }
  }

  /**
   * @return {void}
   * @param {any} e -
   * @memberof SignInForm
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  /**
   * @returns {jsx} -
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

const mapPropsToState = (state) => {
  return {
    access: state.access
  };
};

SignInForm.propTypes = {
  signInUser: PropTypes.func.isRequired,
  access: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default connect(mapPropsToState, { signInUser })(withRouter(SignInForm));

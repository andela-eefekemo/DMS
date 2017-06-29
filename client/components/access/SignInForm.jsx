import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AccessActions from '../../actions/AccessActions';
import InputField from '../common/InputField';
import validate from '../../utilities/validate';

const signInUser = AccessActions.signInUser;
/**
 * @class SignInForm
 * @extends {Component}
 */
class SignInForm extends Component {
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
   * @param {any} e -
   * @memberof SignInForm
   */
  onSubmit(e) {
    e.preventDefault();
    try {
      if (!validate(this.state)) {
        throw new Error('No field should be left blank');
      }
      this.props.signInUser(this.state)
        .then(() => {
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
      <form onSubmit={this.onSubmit}>
        <h5 className="center"> Sign In!</h5>
        <InputField
          name="email"
          label="Email"
          className="validate form-design"
          type="email" onChange={this.onChange} />
        <InputField
          name="password"
          label="Password"
          className="validate form-design"
          type="password" onChange={this.onChange} />
        <div className="input-field center">
          <button className="waves-effect btn button-design" type="submit">
            Sign In
          </button>
        </div>
      </form>
    );
  }
}

SignInForm.propTypes = {
  signInUser: PropTypes.func.isRequired
};

SignInForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { signInUser })(SignInForm);

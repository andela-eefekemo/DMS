import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * SignIn component for logging in a user
 * @param {Object} props { logInUser }
 * @returns {String} The HTML markup for the SignInForm
 */
const SignInForm = ({ logInUser }) => {

  const [values, setValues] = useState({email: '', password: ''});

  const onChange = e => {
    const {name, value} = e.target;
    setValues({ ...values, [name]: value });
  }

  const submit = () => logInUser(values)

  return (
    <Fragment>
      <h5 className="center"> Log Into Doc-ms</h5>
      <div className="input-field">
        <input
          className="validate form-design"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="input-field">
        <input
          className="validate form-design"
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
          placeholder="password"
          required
        />
      </div>
      <div className="input-field center">
        <button
          id="submit-signin"
          className="waves-effect btn button-design"
          onClick={submit}
        >
          Sign In
        </button>
      </div>
      <p className="center">
        Don&#39;t Have an account? <Link to="signup">Create an Account</Link>
      </p>
    </Fragment>
  );
};

SignInForm.propTypes = {
  logInUser: PropTypes.func.isRequired
};

export default SignInForm;

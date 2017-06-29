import React from 'react';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const LandingDisplay = () => (
  <div className="row auth-card">
    <div className="card">
      <div className="card-tabs">
        <ul className="tabs tabs-fixed-width">
          <li className="tab">
            <a className="active" href="#signUp">Sign Up</a>
          </li>
          <li className="tab">
            <a href="#signIn">Sign In</a>
          </li>
        </ul>
      </div>
      <div className="card-content">
        <div id="signUp">
          <SignUpForm />
        </div>
        <div id="signIn">
          <SignInForm />
        </div>
      </div>
    </div>
  </div>
);

export default LandingDisplay;

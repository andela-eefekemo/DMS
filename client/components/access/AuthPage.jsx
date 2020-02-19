import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ConnectedHeader from "../include/Header";

import SignInForm from "./SignInForm";
import SignUpConnectedForm from "./SignUpForm";

import AccessActions from "../../actions/AccessActions";
import validate from "../../utilities/validate";

const signInUser = AccessActions.signInUser;

/**
 * @class LandingContainer
 * @extends {Component}
 */
export class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.logInUser = this.logInUser.bind(this);
  }
  /**
   * Validates the log in user details
   * Makes an action call to sign in the user
   * Toasts the error/success message
   * @return {void}
   * @memberof AuthPage
   */
  async logInUser(loginDetails) {
    try {
      const { valid } = validate.validateLogin(loginDetails);
      if (!valid) throw new Error("No field should be left blank");

      const user = await this.props.signInUser(loginDetails);
      if (this.props.access.message) {
        return Materialize.toast( this.props.access.message, 2000, "indigo darken-4 white-text rounded");
      }

      Materialize.toast("Welcome!", 2000, "indigo darken-4 white-text rounded");
      this.props.history.push("/dashboard");
    } catch (err) {
      Materialize.toast( err.message, 3000, "indigo darken-4 white-text rounded");
    }
  }

  /**
   * Renders a component
   * @returns {void}
   * @memberof LandingContainer
   */
  render() {
    return (
      <div>
        <ConnectedHeader match={this.props.match} />
        <div className="container authpage">
          <div className="row auth-card">
            <Switch>
              <Route
                exact
                path={`${this.props.match.path}/signin`}
                render={props => (
                  <SignInForm {...props} logInUser={this.logInUser} />
                )}
              />
              <Route
                exact
                path={`${this.props.match.path}/signup`}
                component={SignUpConnectedForm}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
const mapPropsToState = state => ({
  access: state.access
});

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default connect(mapPropsToState, { signInUser })(withRouter(AuthPage));

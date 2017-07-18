import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserActions from '../../actions/UserActions';

import validate from '../../utilities/validate';
import UserDisplay from './UserDisplay';

const updateUser = UserActions.updateUser;
/**
 * @class UserContainer
 * @extends {Component}
 */
export class UserContainer extends Component {
  /**
   * Creates an instance of ProfileContainer.
   * @param {any} props -
   * @memberof ProfileContainer
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
   * @return {void}
   * @memberof UserContainer
   */
  componentWillMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      roleId: this.props.user.roleId
    });
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
 * @memberof UserContainer
 */
  onSubmit() {
    try {
      if (!validate(this.state)) {
        throw new Error('No field should be left blank');
      }
      this.props.updateUser(this.state, this.props.user.id)
        .then(() => {
          if (this.props.user.message) {
            return Materialize.toast(
              this.props.user.message, 2000,
              'indigo darken-4 white-text rounded');
          }
          Materialize.toast(
            'Success!', 2000, 'indigo darken-4 white-text rounded');
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
   * @memberof UserContainer
   */
  onChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }

  /**
   * @returns {jsx} -
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
    user: state.access.user
  };
};

UserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.object
};


export default connect(
  mapPropsToState, { updateUser })(withRouter(UserContainer));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RoleActions from '../../actions/RoleActions';
import RoleCard from './RoleCard';

const viewRole = RoleActions.viewRole;
const updateRole = RoleActions.updateRole;
const deleteRole = RoleActions.deleteRole;
/**
 * @class RoleList
 * @extends {Component}
 */
class RoleList extends Component {
  /**
   * Creates an instance of RoleList.
   * @param {any} props -
   * @memberof RoleList
   */
  constructor(props) {
    super(props);
    this.state = {
      Roles: [],
      Role: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
  }

  /**
   * @return {void}
   * @memberof RoleList
   */
  componentWillMount() {
    this.props.viewRole()
      .then(() => {
        console.log(this.props);
        this.setState({
          Roles: this.props.roles
        });
      }).catch(() => {

      });
  }
  /**
   * @return {void}
   * @param {any} nextProps -
   * @memberof RoleList
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.RoleList !== nextProps.RoleList) {
      this.setState({
        Roles: nextProps.RoleList
      });
    }
  }
  /**
   * @return {void}
   * @param {any} e -
   * @memberof RoleContainer
   */
  onChange(e) {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }

  /**
   * @return {void}
   * @param {any} e -
   * @memberof RoleList
   */
  deleteRole(e) {
    this.props.deleteRole(e.target.value).then(() => {
      console.log('Role has been deleted');
      this.context.router.history.push(`${this.props.match.url}`);
    }).catch(() => {

    });
  }

  /**
   * @return {void}
   * @memberof RoleList
   */
  onSubmit() {
    const updatedRole = {
      title: this.state.title,
      description: this.state.description,
    };
    this.props.updateRole(updatedRole, this.props.Role.id)
      .then(() => {
        this.setState({
          title: this.props.Role.title,
          description: this.props.Role.description,
        });
      }).catch(() => {

      });
  }

  /**
   * @returns {jsx} -
   * @memberof RoleList
   */
  render() {
    const singleRole = this.state.Roles.map(Role => (
      <RoleCard
        key={Role.id} {...Role}
        onClick={this.onSubmit}
        onSubmit={this.onChange}
        deleteRole={this.deleteRole}
        match={this.props.match} />
    ));
    return (
      <div className="container">
        <div className="row">
          {singleRole}
        </div>
      </div>
    );
  }
}

RoleList.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapPropsToState = (state) => {
  return {
    role: state.role.role,
    roles: state.role.roleList,
    access: state.access
  };
};

export default connect(
  mapPropsToState, { viewRole, updateRole, deleteRole })(RoleList);

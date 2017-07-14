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
export class RoleList extends Component {
  /**
   * Creates an instance of RoleList.
   * @param {any} props -
   * @memberof RoleList
   */
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      role: {}
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
        this.setState({
          roles: this.props.roleList
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
    if (this.props.roleList !== nextProps.roleList) {
      this.setState({
        roles: nextProps.roleList
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
    this.props.updateRole(updatedRole, this.props.role.id)
      .then(() => {
        this.setState({
          title: this.props.role.title,
          description: this.props.role.description,
        });
      }).catch(() => {

      });
  }

  /**
   * @returns {jsx} -
   * @memberof RoleList
   */
  render() {
    const singleRole = this.state.roles.map(Role => (
      <RoleCard
        key={Role.id} {...Role}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
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

const mapPropsToState = (state) => {
  return {
    role: state.role.role,
    roleList: state.role.roleList,
    access: state.access
  };
};

RoleList.contextTypes = {
  router: PropTypes.object.isRequired
};

RoleList.propTypes = {
  viewRole: PropTypes.func,
  updateRole: PropTypes.func,
  deleteRole: PropTypes.func,
  role: PropTypes.object,
  roleList: PropTypes.array,
  match: PropTypes.object
};

export default connect(
  mapPropsToState, { viewRole, updateRole, deleteRole })(RoleList);

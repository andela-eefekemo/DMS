import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
    this.updateRoleList();
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
   * @memberof RoleList
   */
  updateRoleList() {
    this.props.viewRole()
      .then(() => {
        if (this.props.role.message) {
          return Materialize.toast(this.props.role.message,
            2000, 'indigo darken-4 white-text rounded');
        }
        this.setState({
          roles: this.props.roleList
        });
      });
  }
  /**
   * @return {void}
   * @param {any} e -
   * @memberof RoleList
   */
  deleteRole(e) {
    this.props.deleteRole(e.target.name).then(() => {
      this.updateRoleList();
      this.props.history.push(`${this.props.match.url}`);
    });
  }

  /**
   * @return {void}
   * @param {any} e
   * @memberof RoleList
   */
  onSubmit(e) {
    const updatedRole = {
      title: this.state.title,
      description: this.state.description,
    };
    this.props.updateRole(updatedRole, e.target.name)
      .then(() => {
        if (this.props.role.message) {
          return Materialize.toast(this.props.role.message,
            2000, 'indigo darken-4 white-text rounded');
        }
        Materialize.toast('Role successfully updated',
          2000, 'indigo darken-4 white-text rounded');
        this.updateRoleList();
        this.props.history.push(`${this.props.match.url}`);
      });
  }

  /**
   * @returns {jsx} -
   * @memberof RoleList
   */
  render() {
    return (
      <div className="document-list">
        <div className="container">
          <div className="row">
            <div className="document-list-view">
              <div className="col l6 m6 s12">
                <div className=" card-panel hoverable">
                  <h5>All Roles</h5>
                  <div className="divider" />
                  <div className="scrollable">
                    {this.state.roles.map(Role => (
                      <RoleCard
                        key={Role.id} {...Role}
                        onSubmit={this.onSubmit}
                        onChange={this.onChange}
                        deleteRole={this.deleteRole}
                        match={this.props.match} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    role: state.role,
    roleList: state.role.roleList,
    access: state.access
  };
};

RoleList.propTypes = {
  viewRole: PropTypes.func,
  updateRole: PropTypes.func,
  deleteRole: PropTypes.func,
  roleList: PropTypes.array,
  role: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};

export default connect(
  mapPropsToState, { viewRole, updateRole, deleteRole })(withRouter(RoleList));

import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({ match, user }) => {
  return (
    <ul id="slide-out" className="side-nav fixed ">
      <li><div className="user-view">
        <div className="side-logo center">
          <Link to="/" className="brand-logo">
            <img
              className="brand-img"
              src="../../img/logo2.jpg" alt="sidebar-logo" /> ms</Link>
        </div>
      </div></li>
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i>Document</div>
          <div className="collapsible-body">
            <ul>
              <li><Link to={`${match.url}/document`}>
                <i className="material-icons">perm_media</i>Create Document</Link>
              </li>
              <li><Link to={`${match.url}/alldocument`}>
                <i className="material-icons">perm_media</i>All Document</Link></li>
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i>Users</div>
          <div className="collapsible-body">
            <ul>
              <li><Link to="/dashboard">
                <i className="material-icons">perm_identity</i>Profile</Link></li>
              {user.roleId === 1 && <li><Link to={`${match.url}/allusers`}>
                <i className="material-icons">perm_media</i>All Users</Link></li>}
            </ul>
          </div>
        </li>
        {user.roleId === 1 && <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i>Roles</div>
          <div className="collapsible-body">
            <ul>
              {user.roleId === 1 && <li><Link to={`${match.url}/role`}>
                <i className="material-icons">supervisor_account</i>Create Role</Link>
              </li>}
              {user.roleId === 1 && <li><Link to={`${match.url}/allroles`}>
                <i className="material-icons">perm_media</i>All Roles</Link></li>}
            </ul>
          </div>
        </li>}
      </ul >
    </ul >
  );
};

export default SideBar;


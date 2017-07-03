import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({ match }) => {
  return (
    <ul id="slide-out" className="side-nav fixed">
      <li><div className="user-view">
        <div className="side-logo center">
          <Link to="/" className="brand-logo"><img className="brand-img" src="../../img/logo2.jpg" /> ms</Link>
        </div>
        <Link to=""><img className="circle" src="images/yuna.jpg" alt="imag" /></Link>
        <Link to=""><span className="white-text name">John Doe</span></Link>
        <Link to=""><span className="white-text email">jdandturk@gmail.com</span></Link>
      </div></li>
      <li><Link to="/dashboard"><i className="material-icons">perm_identity</i>Profile</Link></li>
      <li><Link to={`${match.url}/document`}><i className="material-icons">perm_media</i>Create Document</Link></li>
      <li><Link to={`${match.url}/role`}><i className="material-icons">supervisor_account</i>Create Role</Link></li>
      <li><div className="divider"></div></li>
      <li><Link to="" className="subheader">Subheader</Link></li>
      <li><Link className="waves-effect" to=""><i className="material-icons">cloud</i>Third Link With Waves</Link></li>
    </ul>
  );
};

export default SideBar;


import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ onClick }) => {
  return (
    <nav className="nav-extended nav-design">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">DMS</Link>
        <Link to="" data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">menu</i>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/logout" onClick={onClick} >Logout</Link></li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/logout" onClick={onClick}>Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};


NavBar.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NavBar;

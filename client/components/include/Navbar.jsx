import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ match, onClick }) => {
  if (match.url === '/') {
    return (
      <nav className="nav-extended nav-design">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo"><img className="brand-img" src="../../img/logo2.jpg" /> ms</Link>
          <Link to="" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="signin-button"><Link to="/auth/signin">LOG IN</Link></li>
            <li className="signup-button">
              <Link to="/auth/signup">GET STARTED</Link>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="/auth/signin">LOG IN</Link></li>
            <li><Link to="/auth/signup">GET STARTED</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
  if (match.url === '/auth') {
    return (
      <nav className="nav-extended nav-design">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo"><img className="brand-img" src="../../img/logo2.jpg" /> ms</Link>
        </div>
      </nav>
    );
  }
  if (match.url === '/dashboard') {
    return (
      <nav className="nav-extended dashboard-nav navbar-fixed">
        <div className="nav-wrapper">
          <Link to="" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="signin-button"><Link to="/signout" onClick={onClick}>LOG OUT</Link></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="/signout" onClick={onClick}>LOG OUT</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
};


NavBar.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NavBar;

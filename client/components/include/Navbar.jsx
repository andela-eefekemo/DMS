import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
* Navbar component that displays a Navbar.
* @param {Object} props { match, onClick }
* @returns {String} The HTML markup for the Navbar component
*/
const NavBar = ({ match, onClick }) => (
  <nav className="nav-extended nav-design">
    <div className="nav-wrapper">
      {(match.url === '/' || match.url === '/auth')
        && <Link to="/" className="brand-logo">
          <img
            className="brand-img"
            src="../../img/logo2.jpg" alt="nav-logo" /> ms</Link>}
      <Link to="" data-activates="mobile-demo" className="button-collapse">
        <i className="material-icons">menu</i>
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {(match.url === '/') && <li className="signin-button">
          <Link to="/auth/signin">LOG IN</Link></li>}
        {(match.url === '/') && <li className="signup-button">
          <Link to="/auth/signup">GET STARTED</Link>
        </li>}
        {(match.url === '/dashboard') &&
          <li className="signin-button"><Link to="/" onClick={onClick}>
            LOG OUT</Link></li>}
      </ul>
      <ul className="side-nav" id="mobile-demo">
        {(match.url === '/') && <li>
          <Link to="/auth/signin">LOG IN</Link>
        </li>}
        {(match.url === '/') && <li>
          <Link to="/auth/signup">GET STARTED</Link>
        </li>}
        {(match.url === '/dashboard') &&
          <li><Link to="" onClick={onClick}>LOG OUT</Link></li>}
      </ul>
    </div>
  </nav>
);


NavBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default NavBar;

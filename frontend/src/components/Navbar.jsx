import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FaBell } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';
import { login } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Tours', href: '/Tours', current: false },
  { name: 'Guides', href: '/Guides', current: false },
  { name: 'About', href: '/About', current: false },
  { name: 'Contact', href: '/Contact', current: false },
];

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Explore Mate" className="d-inline-block align-text-top" height="40" />
        </Link>

        <button
          className={`navbar-toggler ${isNavOpen ? 'collapsed' : ''}`}
          type="button"
          onClick={handleNavToggle}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${isNavOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navigation.map((item) => (
              <li key={item.name} className="nav-item">
                <Link
                  className={`nav-link ${item.current ? 'active' : ''}`}
                  to={item.href}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="right-side d-flex align-items-center">
            <button
              type="button"
              className="btn btn-dark position-relative me-3"
            >
              <FaBell size={20} />
            </button>

            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                onClick={handleDropdownToggle}
              >
                <img
                  src={Logo}
                  alt="Profile"
                  className="rounded-circle"
                  height="30"
                  width="30"
                />
                {isAuthenticated ? ` ${user.firstname}` : ' Login'}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}
              >
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

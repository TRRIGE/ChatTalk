import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/user.api";

const Navbar = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const handleOut = () => {
    logoutUser()
      .then((response) => {
        if (response.status) {
          navigation("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-secondary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          ChatTalk
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {location.pathname === "/home" ? (
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={handleOut}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

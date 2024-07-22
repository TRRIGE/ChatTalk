import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  axios.defaults.withCredentials = true;
  const location = useLocation();
  const navigation = useNavigate();

  const handleOut = () => {
    axios
      .get("http://localhost:3000/user/logout")
      .then((response) => {
        if (response.data.status) {
          navigation("/");
        }
      })
      .catch((error) => {
        console.log("Error while logging out", error);
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
              ""
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
            {location.pathname === "/home" && (
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={handleOut}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

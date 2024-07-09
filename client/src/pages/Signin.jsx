import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  axios.defaults.withCredentials = true;
  const onsubmitHandler = (e) => {
    e.preventDefault();

    const { email, password } = values;

    loginUser({ email, password })
      .then((response) => {
        if (response.status) {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log("Error while loging user", error);
      });
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center mt-5 mb-3">Sign In to ChatTalk</h1>
          <form
            id="signinForm"
            onSubmit={onsubmitHandler}
            className="border border-2 border-secondary p-4 rounded-4"
          >
            <div class="form-group mb-3">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                value={values.email}
                name="email"
                onChange={onchangeHandler}
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                value={values.password}
                name="password"
                onChange={onchangeHandler}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" class="btn btn-secondary btn-block">
                Sign In
              </button>
            </div>
            <div>
              <p>
                <Link to="/forgot-password" class="text-secondary">
                  Forgot Password?
                </Link>
              </p>
              <p class="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup" class="text-secondary">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

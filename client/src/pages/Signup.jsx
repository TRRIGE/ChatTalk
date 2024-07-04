import React, { useState } from "react";
import { registerUser } from "../api/user.api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();

    const { username, email, password } = values;

    registerUser({ username, email, password })
      .then((data) => {
        if (!data) {
          // if (data.message === "User already exists") {
          //   alert("User already exists with this email");
          //   console.log("User already exists with this email");
          // }
          // console.log("Signup failed due to some error");
          console.log("Signup failed");
        } else {
          console.log("Signup successful");
          setValues({
            username: "",
            email: "",
            password: "",
          });
          navigate("/signin");
        }
      })
      .catch((error) => {
        alert("User already exists with this email");
        console.log("Error while registering user", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-5 mb-5">Signup For ChatTalk</h1>
          <form id="signupForm" onSubmit={onsubmitHandler}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={values.username}
                name="username"
                onChange={onchangeHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={values.email}
                name="email"
                onChange={onchangeHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={values.password}
                name="password"
                onChange={onchangeHandler}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-secondary btn-block">
                Signup
              </button>
            </div>
            <div>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/signin" className="text-secondary">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();

    const { email, password } = values;

    loginUser({ email, password })
      .then((response) => {
        if (response.status) {
          toast.success("Signin successful. Redirecting to home page...");
          setValues({ email: "", password: "" });
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.message === "User is not registered") {
          toast.error("Email not found. Please register first.");
        } else if (error.message === "Invalid password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(error.message);
        }
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-5 mb-3">Sign In to ChatTalk</h1>
          <form
            id="signinForm"
            onSubmit={onsubmitHandler}
            className="border border-2 border-secondary p-4 rounded-4"
          >
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
                value={values.password}
                name="password"
                onChange={onchangeHandler}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-secondary btn-block">
                Sign In
              </button>
            </div>
            <div>
              <p>
                <Link to="/forgot-password" className="text-secondary">
                  Forgot Password?
                </Link>
              </p>
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="text-secondary">
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

import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center mt-5 mb-5">Sign In to ChatTalk</h1>
          <form id="signinForm">
            <div class="form-group mb-3">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
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

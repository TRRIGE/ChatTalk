import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col mt-3">
          <h1 className="text-center" id="heroText">
            Welcome to ChatTalk
          </h1>
        </div>
      </div>
      <div className="row text-center">
        <Link to="/signup" className="text-decoration-none">
          <button className="btn btn-secondary text-dark">
            Signup to get started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

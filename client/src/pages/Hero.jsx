import React from "react";

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
        <a href="/signup" className="text-decoration-none">
          <button className="btn btn-secondary text-dark">
            Signup to get started
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero;

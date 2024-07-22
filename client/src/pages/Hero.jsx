import React from "react";

const Hero = () => {
  return (
    <div className="container">
      <p className="text-center" id="heroText">
        Welcome to ChatTalk
      </p>
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

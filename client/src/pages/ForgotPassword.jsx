import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/user.api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onchangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();

    forgotPassword({ email })
      .then((response) => {
        if (response.status) {
          alert("Email sent successfully for password reset");
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log("Error while loging user", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-5 mb-5">Forget Password</h1>
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
                value={email}
                name="email"
                onChange={onchangeHandler}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-secondary btn-block">
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

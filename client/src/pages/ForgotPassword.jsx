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

    const { email } = values;

    forgotPassword({ email })
      .then((response) => {
        if (response.status) {
          alert("Email sent successfully for password reset");
          navigate("/login");
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
          <h1 class="text-center mt-5 mb-5">Forget Password</h1>
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
                value={email}
                name="email"
                onChange={onchangeHandler}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" class="btn btn-secondary btn-block">
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

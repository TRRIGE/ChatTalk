import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/user.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const onchangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();

    resetPassword({ password, token })
      .then((response) => {
        if (response.status) {
          toast.success("Password reset successfully");
          setPassword("");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        }
        console.log(response.message);
      })
      .catch((error) => {
        console.log("Error while loging user", error);
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-5 mb-5">Reset Password</h1>
          <form
            id="signinForm"
            onSubmit={onsubmitHandler}
            className="border border-2 border-secondary p-4 rounded-4"
          >
            <div className="form-group mb-3">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter new password"
                value={password}
                name="password"
                onChange={onchangeHandler}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-secondary btn-block">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

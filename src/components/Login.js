import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/index.css";
import Signup from "../pages/Signup";
import Spinner from "./MySpinner";

function LoginComponent() {
  const [isLoading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setLoginData({ ...loginData, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setLoginData({ ...loginData, password: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@']+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      return;
    }
    dispatch(login(loginData, navigate))
      .then(() => {
        toast.loading("Authenticating")

        toast.success("Login successful!");
      })
      .catch((error) => {
        toast.error(error.message || "Could not sign in. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateAccount = () => {
    setShowModal(true);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={loginData.email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={loginData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Login"}
        </button>
        <p type="" className="opt link" onClick={handleCreateAccount}>
          Create Account
        </p>
      </form>
      {showModal && <Signup handleCloseModal={() => setShowModal(false)} />}
      <ToastContainer theme="dark" />
    </div>
  );
}

export default LoginComponent;

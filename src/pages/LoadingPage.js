import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import logo from "../images/Group 4.png";
import MySpinner from "../components/MySpinner";

function LoadingPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const redirectTimer = setTimeout(() => {
        navigate("/auth");
      }, 800); // Wait for fade-out animation to complete before redirecting
      return () => clearTimeout(redirectTimer);
    }, 5000); // Wait for 5 seconds before starting fade-out animation
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`body ${loading ? "loading" : ""}`}>
      <div className="center">
          <img src={logo} alt="l" className="logo" /><span> <h2 className="head">TwittBook</h2></span>&nbsp;&nbsp;&nbsp;&nbsp;
        {loading && <MySpinner />}
      </div>
    </div>
  );
}

export default LoadingPage;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/index";
import "../styles/Home.css";
import logo from "../images/Group 4.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faCompass,
  faBell,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./Logout";
import { useSelector } from "react-redux";

function MessageNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);

  const handleIconClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header">
      <div className="jumbo">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo-icon" />
        </div>
        <div className="input-container">
          <input type="search" placeholder="Find User" />
        </div>
      </div>

      <div className="nav">
        <ul>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>{" "}
          <li
            className={activeTab === "message" ? "active" : ""}
            onClick={() => handleIconClick("message")}
          >
            <Link to="/message">
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>
          </li>{" "}
          <li className="notification-icon">
            <FontAwesomeIcon icon={faBell} onClick={handleBellClick} />
            {isDropdownOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <Link to="">See All</Link>
                </div>
                <ul>
                  <li>
                    <div className="notification-item">
                      <div className="notification-avatar">
                        <img src={user.profilePicture} alt="Avatar" />
                      </div>
                      <div className="notification-content">
                        <p>
                          <span className="notification-username">
                            Log In Successful
                          </span>{" "}
                        </p>
                        <span className="notification-time">Today</span>
                      </div>
                    </div>
                  </li>
                  {/* Add more notification items as needed */}
                </ul>
              </div>
            )}
          </li>{" "}
        </ul>
      </div>

      <div className="nav mid">
        <ul>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => handleIconClick("settings")}
          >
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} />
            </Link>
          </li>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <LogoutButton />
        </ul>
      </div>
    </div>
  );
}

export default MessageNav;
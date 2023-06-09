import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/index";
import "../styles/Home.css";
import logo from "../images/Group 4.png";
import { Link, useNavigate } from "react-router-dom";
import neuron from "../images/neuron.png";
import wayfarer from "../images/logo-removebg-preview(1).396db16a3623509cacbd.png";
import youtube from "../images/index.jpeg";
import react from "../images/react.png";
import { faColumns, faDashboard } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faCompass,
  faBell,
  faUser,
  faCog,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./Logout";
import { useSelector } from "react-redux";
import Aside from "./Aside";

function Nav() {
  const [activeTab, setActiveTab] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
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

  const handleToggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div className="header">
      <div className="jumbo">
        <div className="logo-container">
          <Link to="/home">
            <img src={logo} alt="logo" className="logo-icon" />
          </Link>
        </div>
        <div className="input-container">
          <input type="search" placeholder="Find User" />
        </div>
      </div>

      <div className="nav">
        <ul className="">
          <li onClick={() => handleIconClick("home")}>
            <Link to="/home">
              {" "}
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
          <li className="notification-icon" onClick={handleBellClick}>
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
            className={activeTab === "settings" ? "active" : "desktop-menu"}
            onClick={() => handleIconClick("settings")}
          >
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} />
            </Link>
          </li>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <LogoutButton />
          <li>
            <FontAwesomeIcon
              icon={faBars}
              className="bars"
              onClick={handleToggleOffcanvas}
            />
          </li>
        </ul>
      </div>

      {isOffcanvasOpen && (
        <div className="offcanvas">
          &nbsp;
          <Link to="/settings">
            {" "}
            <FontAwesomeIcon icon={faCog} />
            &thinsp;&thinsp;
            <li className="offcanvas-settings">Settings</li>{" "}
          </Link>{" "}
          <button className="close-button" onClick={handleToggleOffcanvas}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <div className="offcanvas-content">
            <div class="offcanvas-aside">
              <h3 className="text-align">
                <FontAwesomeIcon icon={faColumns} /> &thinsp; Web Applications
              </h3>
              <ul>
                <a href="https://cedar-xeros-expense-tracker.vercel.app/">
                  <li>
                    <img src={react} className="profile-pic" alt="" />
                    CedaXeros Expense Tracker
                  </li>
                </a>
                <a href="https://neuron-s-quote-generator.vercel.app/">
                  <li>
                    <img src={neuron} className="profile-pic" alt="neuron" />{" "}
                    Neurons quote generator
                  </li>
                </a>
                <a href="https://calculator-drab-two.vercel.app/">
                  <li>
                    <img src={react} alt="" className="profile-pic ad" />{" "}
                    Calculator
                  </li>
                </a>
                <a href="https://wayfarer-frontend.onrender.com/">
                  <li>
                    <img src={wayfarer} alt="" className="profile-pic" /> Book a
                    trip with Wayfarer
                  </li>
                </a>
                <a href="https://neuron-s-resume-builder.vercel.app/">
                  <li>
                    <img src={neuron} alt="" className="profile-pic" /> Neuron's
                    Resume Builder
                  </li>
                </a>
                <a href="https://www.youtube.com/@codewithjace2226">
                  <li>
                    <img src={youtube} alt="" className="profile-pic" />{" "}
                    CodeWithJace youtube channel
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;

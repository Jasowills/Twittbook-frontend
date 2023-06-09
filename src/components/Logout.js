import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/index";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 const handleLogout = () => {
   dispatch(logout(navigate)); // Pass the 'navigate' function from React Router
 };


  return (
    <>
      <button className="logout-button desktop-menu" onClick={openModal}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
      {isModalOpen && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h2>Are you sure you want to logout?</h2>
            <button className="logout-yes" onClick={handleLogout}>Yes, Logout</button>
            <button className="logout-cancel" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;

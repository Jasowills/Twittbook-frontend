import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import Aside from "../components/Aside";
import Follow from "../components/Follow";
import VerifiedBadge from "../components/VerifiedBadge";

function Settings() {
  const user = useSelector((state) => state.login);
    const isVerified = useSelector((state) => state.login.isVerified);

  return (
    <div className="set-container">
      <Aside />
      <div className="settings-container">
        <div className="image-editprofile">
          <img src={user.profilePicture} alt="" className="settings-image" />
          &thinsp; &thinsp; &thinsp; &thinsp; &thinsp; &thinsp; &thinsp;
          <div className="wrap">
            <p className="settings-name">
              {user.firstname} {user.lastname}
              {isVerified && (
               <VerifiedBadge/>
              )}
            </p>
            <p className="username">@{user.username}</p>
            <div className="settings-follow">
              <p>{user.followers} followers</p>&nbsp;&nbsp;&nbsp;
              <span>{user.isFollowing} following</span>
            </div>
            <p className="email">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

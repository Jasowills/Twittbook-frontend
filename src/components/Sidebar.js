import React from "react";
import "../styles/Home.css";
import profilePic from "../images/profile.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Follow from "./Follow";
import VerifiedBadge from "./VerifiedBadge";

function Sidebar() {
  const profilePicture = useSelector(
    (state) => state.login.profilePicture || state.signup.profilePicture
  );
  const userProfilePic = profilePicture || profilePic;
  const firstName = useSelector(
    (state) => state.login.firstname || state.signup.firstName
  );
  const lastName = useSelector(
    (state) => state.login.lastname || state.signup.lastName
  );
  const userName = useSelector(
    (state) => state.login.username || state.signup.username
  );
  const followers = useSelector(
    (state) => state.login.followers
  );
  const following = useSelector(
    (state) => state.login.isFollowing 
  );
  const isVerified = useSelector((state) => state.login.isVerified)

  // Import SVG code for verified badge
 

  return (
    <div className="wrap-column">
      <div className="sidebar">
        <div className="profile-picture-container side">
          <img src={userProfilePic} className="profile-pic" alt="prof" />
        </div>
        <div className="names">
          <p className="post-name">
            {firstName} {lastName} 
          </p>
          <p className="username"> @{userName} </p>
        </div>
        <div className="followers">
          <div className="follow">
            <p>Followers</p>
            <p>{followers}</p>
          </div>
          <hr className="hr" />
          <div className="follow">
            <p>Following</p>
            <p>{following}</p>
          </div>
        </div>
        <p className="profile-link">
          <Link className="link" to="/settings">
            My profile
          </Link>
        </p>
      </div>
      &nbsp;
    <Follow/>
    </div>
  );
}

export default Sidebar;

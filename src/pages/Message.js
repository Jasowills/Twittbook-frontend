import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageNav from "../components/MessageNav";
import Sidebar from "../components/Sidebar";
import Aside from "../components/Aside";
import { fetchUser } from "../redux/actions/messageActions";
import { setSelectedUser } from "../redux/actions/messageActions";
import Nav from "../components/Nav";
import "../styles/index.css";
import ConversationComponent from "../components/Conversation";
import VerifiedBadge from "../components/VerifiedBadge";

function Explore() {
  const users = useSelector((state) => state.message.user);
  const isVerified = useSelector((state) => state.login.isVerified);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="body">
      <Nav />
      <div className="flex-container">
        <Sidebar />
        <div className="explore">
          <p className="text-align f-15">Select a message</p>
          <ul>
            {users &&
              users.map((user) => <UserListItem key={user.id} user={user} />)}
          </ul>
        </div>
        <Aside />
      </div>
    </div>
  );
}

function UserListItem({ user }) {
 const isVerified = useSelector((state) => state.login.isVerified);
 const userId = "647a0f99abf4aebc224fad47";
 const Twittbook = "647b03b506bd3ae20b2d5f92";
 const isUserVerified = isVerified && user && user._id === userId;
 const isTwittbook = isVerified && user && user._id === Twittbook;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleSelectUser = () => {
    dispatch(fetchUser(user._id)); // Save userId as receiverId
    dispatch(setSelectedUser(user));
    setShowModal(true); // Show the modal when the user is selected
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal when the close button is clicked
  };

  return (
    <li className="explore-lists">
      <div className="align">
        <span>
          <img src={user.profilePicture} className="prof" alt="" />
        </span>
        <span>
          {user.username}{" "}
          {isUserVerified && (
           <VerifiedBadge/>
          )}
          {isTwittbook && (
            <VerifiedBadge/>
          )}
        </span>
      </div>

      <button id="select-button" onClick={handleSelectUser}>
        Select
      </button>

      {showModal && (
        <div className="message-modal">
          <div className="message-modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="message-modal-header">
              <div className="align">
                <span>
                  <img src={user.profilePicture} className="prof" alt="" />
                </span>
                <span>
                  {user.username}{" "}
                  {isVerified && (
                    <svg
                      width="20px"
                      fill="white"
                      viewBox="0 0 22 22"
                      aria-label="Verified account"
                      role="img"
                      className="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-ea8lvw r-1o7j8w5 r-bnwqim r-1plcrui r-lrvibr"
                      data-testid="icon-verified"
                    >
                      <g>
                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                      </g>
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="message-conversation">
              <ConversationComponent />
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default Explore;

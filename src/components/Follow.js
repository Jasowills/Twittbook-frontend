import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VerifiedBadge from "./VerifiedBadge"
function Follow() {
  const [users, setUsers] = useState([]);
    const isVerified = useSelector((state) => state.login.isVerified);

 

  useEffect(() => {
    const userIDs = [
      "647a0f99abf4aebc224fad47",
      "647b03b506bd3ae20b2d5f92",
      "647bb9facd634d7a38a3e48b",
    ]; // Replace with the actual IDs you want to fetch

    // Fetch user details for each user ID
    const fetchUserDetails = async (userId) => {
      try {
        const response = await fetch(
          `https://pink-lovely-hen.cyclic.app/users/${userId}`
        );
        const userData = await response.json();
        return userData;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    // Fetch user details for the specified IDs
    const fetchUsers = async () => {
      try {
        const userPromises = userIDs.map((userId) =>
          fetchUserDetails(userId)
        );
        const userDetails = await Promise.all(userPromises);
        setUsers(userDetails.filter((user) => user !== null));
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = (userId, followerId) => {
    // Implement the logic to follow the user with the given userId and followerId
    // You can make a POST request to the follow endpoint with the appropriate data
    // For example: fetch(`/follow/${userId}/${followerId}`, { method: "POST" })
  };
  

  return (
    <div className="sidebar">
      <p>Popular Users On Twittbook</p>
      <ul className="follow-list">
        {users.map((user) => (
          <li key={user.id}>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="prof"
            />
            <div>
              <h4>
                {user.username} {isVerified && <VerifiedBadge/>}
              </h4>
            </div>
            {/* <button onClick={() => handleFollow(user.id)}>Follow</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Follow;

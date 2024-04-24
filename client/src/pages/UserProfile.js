import React from "react";

const UserProfile = ({ username, bio, profilePicture, accountCreatedDate }) => {
  return (
    <div className="UserProfile">
      <h1>User Profile</h1>
      <div>
        <h2>Username:</h2>
        <p>{username}</p>
      </div>
      <div>
        <h2>Bio:</h2>
        <p>{bio}</p>
      </div>
      <div>
        <h2>Profile Picture:</h2>
        <img src={profilePicture} alt="Profile" />
      </div>
      <div>
        <h2>Account Created Date:</h2>
        <p>{accountCreatedDate}</p>
      </div>
    </div>
  );
};

export default UserProfile;

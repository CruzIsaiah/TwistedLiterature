import React, { useEffect, useState } from "react";
import { useAuth } from "../config/firebase"; 

const UserProfile = () => {
  const user = useAuth(); 
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    const extractUsername = () => {
      if (user) {
        const email = user.email;
        const atIndex = email.indexOf("@");
        const extractedUsername = atIndex !== -1 ? email.substring(0, atIndex) : email;
        setUsername(extractedUsername);
      }
    };

    extractUsername();
  }, [user]);

  if (!user) {
    return <div>No User Found...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <h2>User ID:</h2>
        <p>{user.uid}</p>
      </div>
      <div>
        <h2>User Email:</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <h2>Username:</h2>
        <p>{username}</p>
      </div>
      <div>
        <h2>Account Created Date:</h2>
        <p>{user.metadata.creationTime}</p>
      </div>
    </div>
  );
};

export default UserProfile;


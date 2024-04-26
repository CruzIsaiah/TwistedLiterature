import React, { useState } from "react";
import { db, storage } from "../config/firebase"; // Import the Firebase storage instance
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary storage functions
import "./UserProfile.css";

const UserProfile = ({ username, bio, profilePicture, accountCreatedDate }) => {
  const [image, setImage] = useState(null); // State to store the uploaded image

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    if (!image) return; // Return if no image is selected

    try {
      // Create a storage reference for the image
      const storageRef = ref(storage, `profile_images/${username}/${image.name}`);

      // Upload the image file to Firebase Storage
      await uploadBytes(storageRef, image);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Here you can save the imageUrl to the user's profile in the database
      // For simplicity, I'm logging the URL to the console
      console.log("Image uploaded successfully. URL:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
        <h2>Upload Profile Picture:</h2>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <button onClick={handleImageUpload}>Upload</button>
      </div>
      <div>
        <h2>Account Created Date:</h2>
        <p>{accountCreatedDate}</p>
      </div>
    </div>
  );
};

export default UserProfile;

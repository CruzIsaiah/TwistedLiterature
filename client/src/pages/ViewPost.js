import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);

  // Fetch post data and upvotes count based on ID from Firestore
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost(postData);
          setUpvotes(postData.upvotes); // Set upvotes count from database
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id]); // Run effect whenever the ID parameter changes

  const updateUpvotes = async () => {
    try {
      // Update upvotes count in the database
      await updateDoc(doc(db, "posts", id), {
        upvotes: upvotes + 1,
      });
      // Update the upvotes count in the UI
      setUpvotes((count) => count + 1);
    } catch (error) {
      console.error("Error updating upvotes count:", error);
      // Handle error, e.g., display error message to the user
    }
  };

  if (!post) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div className="PostCard">
      <h2 className="title">{post.title}</h2>
      <h3 className="author">{"by " + post.authorId}</h3>
      <p className="description">{post.body}</p>
      {/* <p className="datePosted">{formattedDate(post.date)}</p> */}
      <button className="upvoteButton" onClick={updateUpvotes}>
        👍 Upvotes: {upvotes}
      </button>
    </div>
  );
};

export default ViewPost;

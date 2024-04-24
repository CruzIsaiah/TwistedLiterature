import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    title: "",
    description: "",
  });

  // Fetch post data based on ID from Firestore
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost({
            id: postDoc.id,
            title: postData.title,
            description: postData.description,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]); // Run effect whenever the ID parameter changes

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        title: post.title,
        description: post.description,
      });
      console.log("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const postRef = doc(db, "posts", id);
      await deleteDoc(postRef);
      console.log("Post deleted successfully!");
      // Redirect to a different page after deletion (e.g., home page)
      window.location.replace("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <label htmlFor="description">Description</label> <br />
        <textarea
          rows="15"
          cols="50"
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
        <button className="deleteButton" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditPost;

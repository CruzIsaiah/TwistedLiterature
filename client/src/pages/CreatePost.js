import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [upvotes, setUpvotes] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
  
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        body,
        datePosted: serverTimestamp(),
        upvotes: 0, // Set the upvotes count to 0 when creating a new post
      });
  
      console.log("Post added with ID: ", docRef.id); 
  
      // Reset form fields after successful submission
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label> <br />
        <input
  type="text"
  id="title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="titleInput" 
  required
/>

        <br />
        <br />
        <label htmlFor="body">Body</label> <br />
        <textarea
          rows="5"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

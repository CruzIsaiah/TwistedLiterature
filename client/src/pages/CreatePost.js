import React, { useState } from "react"; // Importing React and useState from 'react'
import { useParams } from "react-router-dom";

const CreatePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    title: "",
    author: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <form>
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
        <label htmlFor="author">Author</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          rows="15"
          cols="50"
          id="description"
          name="description" // Ensure name matches the state property name
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePost;

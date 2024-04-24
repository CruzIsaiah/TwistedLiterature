import React, { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

const Card = (props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLikeCount((count) => count + 1);
  };

  const handleUpvote = () => {
    setUpvoteCount((count) => count + 1);
  };

  const handleDownvote = () => {
    setDownvoteCount((count) => count + 1);
  };

  // Function to add a new comment
  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="Card">
      <Link to={"edit/" + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{props.title}</h2>
      <h3 className="author">{"by " + props.author}</h3>
      <p className="description">{props.description}</p>
      <div>
        <button className="voteButton" onClick={handleUpvote}>
          Upvote 👍🏻: {upvoteCount}
        </button>
        <button className="voteButton" onClick={handleDownvote}>
          Downvote 👎🏻: {downvoteCount}
        </button>
      </div>
      {/* Comment section */}
      <div className="comments">
        <h3>Comments</h3>
        {/* Render existing comments */}
        {comments.map((comment, index) => (
          <Comment
            key={index}
            author={comment.author}
            content={comment.content}
          />
        ))}
        {/* Add new comment form */}
        <form
          onSubmit={(e) => {
            /* Handle form submission */
          }}
        >
          <input type="text" placeholder="Your name" />
          <textarea placeholder="Your comment"></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default Card;

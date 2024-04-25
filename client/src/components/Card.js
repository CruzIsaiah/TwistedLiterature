import React, { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

const Card = (props) => {
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleUpvote = () => {
    setUpvoteCount((count) => count + 1);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { author: "Anonymous", content: newComment }]);
      setNewComment("");
    }
  };

  // Function to format the timestamp into a human-readable date and time
  const formattedDate = (date) => {
    if (date && date.seconds) {
      const postDate = new Date(date.seconds * 1000);
      const dateString = postDate.toLocaleDateString();
      const timeString = postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${dateString} ${timeString}`;
    }
    return "";
  };

  return (
    <div className="Card">
      <Link to={"edit/" + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{props.title}</h2>
      <h3 className="author">{"by " + props.author}</h3>
      <p className="description">{props.description}</p>
      <p className="datePosted">{formattedDate(props.date)}</p>
      <div>
        <button className="voteButton" onClick={handleUpvote}>
         ⬆️ {upvoteCount}
        </button>
      </div>
      <div className="comments-container">
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            author={comment.author}
            content={comment.content}
          />
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <textarea
            className="comment-input"
            placeholder="Your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default Card;

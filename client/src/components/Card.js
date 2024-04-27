import React, { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

const Card = (props) => {
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [newComment, setNewComment] = useState("");

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
      <Link to={`viewPost/${props.id}`} style={{ textDecoration: 'none' }}>
        <h2 className="title">{props.title}</h2>
      </Link>
      <p className="datePosted">{formattedDate(props.date)}</p>
      <p className="upVotes"> {upvoteCount} Upvotes</p>
      <p className="comments"> {commentCount} Comments</p>
    </div>
  );
};

export default Card;

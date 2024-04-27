import React, { useState, useEffect } from "react";
import "./Card.css";
import edit from "./edit.png";
import { Link } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Card = (props) => {
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  // Fetch post data based on ID from Firestore
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", props.id));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setUpvoteCount(postData.upvotes || 0);
          // Fetch comments associated with the post and count them
          const commentsCollection = collection(db, `posts/${props.id}/comments`);
          const commentsSnapshot = await getDocs(commentsCollection);
          setCommentCount(commentsSnapshot.size); // Set comment count
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [props.id]); // Run effect whenever the ID parameter changes

  // Function to format the timestamp into a human-readable date and time
  const formattedDate = (date) => {
    if (date && date.seconds) {
      const postDate = new Date(date.seconds * 1000);
      const dateString = postDate.toLocaleDateString();
      const timeString = postDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dateString} ${timeString}`;
    }
    return "";
  };

  return (
    <div className="Card">
      <Link to={"edit/" + props.id}>
        <img className="moreButton" alt="edit button" src={edit} />
      </Link>
      <Link to={`viewPost/${props.id}`} style={{ textDecoration: 'none' }}>
        <h2 className="title">{props.title}</h2>
      </Link>
      <p className="datePosted">{formattedDate(props.date)}</p>
      <p className="comments">{commentCount} Comments</p>
      <p className="upVotes">{upvoteCount} Upvotes</p>
      
    </div>
  );
};

export default Card;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, serverTimestamp, query, orderBy, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

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

  // Fetch comments associated with the post from Firestore and order them by date
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(db, `posts/${id}/comments`);
        const commentsQuery = query(commentsCollection, orderBy("timestamp", "asc"));
        const commentsSnapshot = await getDocs(commentsQuery);
        const fetchedComments = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim()) return;

    try {
      // Add comment to Firestore under the specific post
      const docRef = await addDoc(collection(db, `posts/${id}/comments`), {
        comment: comment,
        timestamp: serverTimestamp(),
      });

      console.log("Comment added with ID: ", docRef.id); // Log the ID of the added comment

      // Clear comment input after successful submission
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

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
    <div className="CommentCard">
      <h2 className="title">{post.title}</h2>
      <p className="description">{post.body}</p>
      <div className="buttonContainer" style={{ textAlign: "left" }}>
        {/* Align buttons to the left */}
        <button className="upvoteButton" onClick={updateUpvotes}>
          Like: {upvotes}
        </button>
      </div>

      {/* Comment section */}
      <div className="commentSection">
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            rows="3"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        <div className="commentsList">
          {comments.map((comment) => (
            <div key={comment.id} className="comment" style={{ borderTop: "1px solid white", borderBottom: "1px solid white" }}>
              <p>{comment.comment}</p>
              <p>{comment.timestamp.toDate().toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;

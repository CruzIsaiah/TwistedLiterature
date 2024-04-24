import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; // Import db directly from firebase.js
import Card from "../components/Card";

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts from Firestore
        const querySnapshot = await getDocs(collection(db, "posts"));
        const tempPosts = [];
        querySnapshot.forEach((doc) => {
          tempPosts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(tempPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ReadPosts" style={{ display: "flex", flexDirection: "column" }}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
<Card
  id={post.id}
  title={post.title}
  author={post.author}
  description={post.body} // Ensure the description field is correctly passed
/>


          </div>
        ))
      ) : (
        <h2>No Posts Yet 😞</h2>
      )}
    </div>
  );
};

export default ReadPosts;

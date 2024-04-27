import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../config/firebase";
import Card from "../components/Card";

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        let postsQuery = query(postsCollection, orderBy("datePosted", "desc")); // Sort by datePosted in descending order

        // Apply search filter if searchTerm exists
        if (searchTerm) {
          const searchTermLower = searchTerm.toLowerCase();
          postsQuery = query(
            postsCollection,
            where("title", ">=", searchTermLower),
            where("title", "<=", searchTermLower + "\uf8ff"),
            orderBy("title")
          );
        }

        const postsSnapshot = await getDocs(postsQuery);
        const fetchedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '600px',
          height: '20px',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          outline: 'none',
          marginBottom: '50px' // Add margin bottom to create space
        }}
      />

      {posts.map((post) => (
        <Card
          key={post.id}
          id={post.id}
          title={post.title}
          author={post.author}
          description={post.description}
          date={post.datePosted}
          upvoteCount={post.upvotes}
          commentCount={post.comments ? post.comments.length : 0} // Check if comments array exists before accessing length property
        />
      ))}
    </div>
  );
};

export default ReadPosts;

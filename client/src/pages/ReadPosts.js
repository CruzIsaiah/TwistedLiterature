import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const ReadPosts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.data);
  }, [props]);

  return (
    <div
      className="ReadPosts"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
            <Card
              id={post.id}
              title={post.title}
              author={post.author}
              description={post.description}
            />
          </div>
        ))
      ) : (
        <h2>{"No Challenges Yet 😞"}</h2>
      )}
    </div>
  );
};

export default ReadPosts;

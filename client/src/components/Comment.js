// Comment.js

import React from "react";

const Comment = ({ author, content }) => {
  return (
    <div className="comment">
      <p className="author">{author}</p>
      <p className="content">{content}</p>
    </div>
  );
};

export default Comment;

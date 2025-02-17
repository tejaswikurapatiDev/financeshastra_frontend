import React, { useState } from "react";
import "./Comment.css"; // Import the CSS file

function CommentSection() {
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Comment submitted: ${comment}`);
    setComment("");
    setShowInput(false);
  };

  return (
    <div className="comment-container">
     
      <button className="add-comment-button" onClick={handleShowInput}>
        Add a Comment
      </button>

      {showInput && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            className="comment-textarea"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment..."
          /><br/>
          <button className="submit-comment-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
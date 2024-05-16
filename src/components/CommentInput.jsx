import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ onComment }) {
  const [content, setContent] = useState('');

  function onCommentHandler() {
    onComment(content);
    setContent('');
  }

  function handleContentChange({ target }) {
    if (target.value.length <= 500) {
      setContent(target.value);
    }
  }

  return (
    <div className="thread-comment-input">
      <textarea type="text" placeholder="Write comment here ..." value={content} onChange={handleContentChange} />
      <p className="thread-comment-input__char-left">
        <strong className="comment-length">{content.length}</strong>
        /500
      </p>
      <button type="submit" onClick={onCommentHandler}>Reply</button>
    </div>
  );
}

CommentInput.propTypes = {
  onComment: PropTypes.func.isRequired,
};

export default CommentInput;

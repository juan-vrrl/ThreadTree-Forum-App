import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, setBody] = useState('');

  function addthread() {
    addThread(title, body, category);
    setBody('');
    setTitle('');
    setCategory('');
  }

  function handleBodyChange({ target }) {
    if (target.value.length <= 1500) {
      setBody(target.value);
    }
  }

  return (
    <div className="thread-input">
      <input
        type="text"
        placeholder="Title ..."
        value={title}
        onChange={onTitleChange}
      />
      <br />
      <input
        type="text"
        placeholder="Category ..."
        value={category}
        onChange={onCategoryChange}
      />

      <textarea
        placeholder="Express your mind here ..."
        value={body}
        onChange={handleBodyChange}
      />
      <p className="thread-input__char-left">
        <strong className="body-length">{body.length}</strong>
        /1500
      </p>

      <button type="submit" onClick={addthread}>Create Thread Branch</button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;

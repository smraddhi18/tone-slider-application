import React from 'react';
import { useSelector } from 'react-redux';
import { setError } from '../redux/slices/editorSlice';

const Editor = ({ text, onTextChange }) => {
  const isLoading = useSelector(state => state.editor.isLoading);
  
  const handleTextChange = (e) => {
    if (isLoading) {
      return;
    }
    onTextChange(e.target.value);
  };

  return (
    <div className="editor-container">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here…"
        disabled={isLoading}
      />
    </div>
  );
};

export default Editor;

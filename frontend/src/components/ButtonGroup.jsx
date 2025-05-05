import React from 'react';
import { useSelector } from 'react-redux';

const ButtonGroup = ({ onUndo, onRedo, onReset, canUndo, canRedo }) => {
  const isLoading = useSelector(state => state.editor.isLoading);

  return (
    <div className="button-group">
      <button onClick={onUndo} disabled={!canUndo || isLoading}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo || isLoading}>
        Redo
      </button>
      <button onClick={onReset} disabled={isLoading}>
        Reset
      </button>
    </div>
  );
};

export default ButtonGroup;

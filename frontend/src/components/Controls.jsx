import React from "react";
export default function Controls({ onUndo, onRedo, onReset, canUndo, canRedo, loading }) {
  return (
    <div className="flex gap-2 mt-4">
      <button onClick={onUndo} disabled={!canUndo} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Undo</button>
      <button onClick={onRedo} disabled={!canRedo} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Redo</button>
      <button onClick={onReset} disabled={loading} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Reset</button>
    </div>
  );
}
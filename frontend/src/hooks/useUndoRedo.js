import { useReducer, useCallback } from "react";

const ActionType = {
  SET: "SET",
  UNDO: "UNDO",
  REDO: "REDO",
  RESET: "RESET",
  INIT: "INIT",
};

const undoRedoReducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET: {
      const { present } = state;
      if (JSON.stringify(present) === JSON.stringify(action.newPresent)) {
        return state;
      }
      return {
        past: [...state.past, present],
        present: action.newPresent,
        future: [],
      };
    }
    case ActionType.UNDO: {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case ActionType.REDO: {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }
    case ActionType.RESET:
      return {
        past: [],
        present: action.initialPresent,
        future: [],
      };
    case ActionType.INIT:
      return action.payload;
    default:
      return state;
  }
};

export const useUndoRedo = (initialPresent, persistedState = null) => {
  const [state, dispatch] = useReducer(
    undoRedoReducer,
    persistedState || {
      past: [],
      present: initialPresent,
      future: [],
    }
  );

  const setState = useCallback((newPresent) => {
    dispatch({ type: ActionType.SET, newPresent });
  }, []);

  const undo = useCallback(() => dispatch({ type: ActionType.UNDO }), []);
  const redo = useCallback(() => dispatch({ type: ActionType.REDO }), []);
  const reset = useCallback(() => {
    dispatch({ type: ActionType.RESET, initialPresent });
  }, [initialPresent]);

  return {
    state: state.present,
    setState,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    past: state.past,
    future: state.future,
  };
};

import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './slices/editorSlice';

const store = configureStore({
  reducer: {
    editor: editorReducer
  }
});

export default store;

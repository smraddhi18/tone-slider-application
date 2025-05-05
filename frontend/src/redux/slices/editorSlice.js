import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rewriteText } from '../../utils/api';
import { getFriendlyErrorMessage } from '../../utils/helpers';

export const defaultState = { text: "", slider: 50 };

export const adjustTone = createAsyncThunk(
  'editor/adjustTone',
  async ({ text, toneValue }, { rejectWithValue }) => {
    try {
      if (!text.trim()) {
        return rejectWithValue("Please enter some text first.");
      }
      const rewrittenText = await rewriteText(text, toneValue);
      return { text: rewrittenText, slider: toneValue };
    } catch (err) {
      return rejectWithValue(getFriendlyErrorMessage(err));
    }
  }
);

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    isLoading: false,
    error: "",
    current: defaultState,
    history: [],
    future: [],
    localSlider: defaultState.slider,
  },
  reducers: {
    updateLocalSlider: (state, action) => {
      state.localSlider = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setText: (state, action) => {
      const { text, slider } = action.payload;
      state.history.push(state.current);
      state.current = { text, slider };
      state.future = []; // clear redo stack
      state.localSlider = slider;
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const prev = state.history.pop();
        state.future.push(state.current);
        state.current = prev;
        state.localSlider = prev.slider;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.pop();
        state.history.push(state.current);
        state.current = next;
        state.localSlider = next.slider;
      }
    },
    reset: (state) => {
      state.history.push(state.current);
      state.current = defaultState;
      state.localSlider = defaultState.slider;
      state.future = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adjustTone.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(adjustTone.fulfilled, (state, action) => {
        state.isLoading = false;
        const { text, slider } = action.payload;
        state.current = { text, slider };
        state.localSlider = slider;
      })
      .addCase(adjustTone.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { 
  updateLocalSlider, 
  setError,
  clearError,
  setLoading,
  setText,
  undo,
  redo,
  reset
} = editorSlice.actions;

export default editorSlice.reducer;

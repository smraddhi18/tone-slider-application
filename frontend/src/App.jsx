import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import Editor from './components/Editor';
import SliderControl from './components/SliderControl';
import ButtonGroup from './components/ButtonGroup';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';

import {
  adjustTone,
  setError,
  updateLocalSlider,
  setText,
  undo,
  redo,
  reset,
  defaultState
} from './redux/slices/editorSlice';

const App = () => {
  const dispatch = useDispatch();

  const {
    current: { text, slider },
    localSlider,
    isLoading,
    error,
    history,
    future
  } = useSelector(state => state.editor);

  const debouncedToneChange = useRef(
    debounce((latestText, newSlider) => {
      if (!latestText.trim()) {
        dispatch(setError("Please enter some text first."));
        return;
      }
      dispatch(adjustTone({ text: latestText, toneValue: newSlider }))
        .unwrap()
        .catch(msg => dispatch(setError(msg)));
    }, 400)
  ).current;

  useEffect(() => {
    return () => {
      debouncedToneChange.cancel();
    };
  }, [debouncedToneChange]);

  const onTextChange = (newText) => {
    if (isLoading) {
      dispatch(setError("Adjusting tone… please wait."));
      return;
    }
    dispatch(setError(""));
    dispatch(setText({ text: newText, slider }));
  };

  const onSliderChange = (newSlider) => {
    dispatch(updateLocalSlider(newSlider));
    dispatch(setText({ text, slider: newSlider }));
    debouncedToneChange(text, newSlider);
  };

  const handleUndo = () => dispatch(undo());
  const handleRedo = () => dispatch(redo());
  const handleReset = () => {
    dispatch(reset());
    dispatch(setError(""));
  };

  return (
    <>
      <h1>Fiddle Tone Slider</h1>
      <div className="app-container">
        <Editor
          text={text}
          onTextChange={onTextChange}
        />

        <div className="controls-container">
          <SliderControl
            slider={slider}
            localSlider={localSlider}
            onSliderChange={onSliderChange}
          />

          <ButtonGroup
            onUndo={handleUndo}
            onRedo={handleRedo}
            onReset={handleReset}
            canUndo={history.length > 0}
            canRedo={future.length > 0}
          />

          {isLoading && <LoadingIndicator />}
          {error     && <ErrorMessage message={error} />}
        </div>
      </div>
    </>
  );
};

export default App;

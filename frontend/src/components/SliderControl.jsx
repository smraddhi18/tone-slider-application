import React from 'react';
import { useSelector } from 'react-redux';
import { getToneDesc } from '../utils/helpers';

const SliderControl = ({ slider, localSlider, onSliderChange }) => {
  const isLoading = useSelector(state => state.editor.isLoading);

  const handleSliderChange = (e) => {
    const newSlider = Number(e.target.value);
    onSliderChange(newSlider);
  };

  return (
    <>
      <label className="slider-label">
        Tone: {getToneDesc(slider)} ({slider})
      </label>
      <input
        type="range"
        className="tone-slider"
        min="0"
        max="100"
        value={localSlider}
        onChange={handleSliderChange}
        disabled={isLoading}
      />
    </>
  );
};

export default SliderControl;

import React from "react";
export default function ToneSlider({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-600 font-medium">Tone: {value > 70 ? "Formal" : value < 30 ? "Casual" : "Neutral"}</label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}
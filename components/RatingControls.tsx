import React from 'react';

interface RatingControlsProps {
    value: number;
    onChange: (value: number) => void;
  }
  
  export default function RatingControls({ value, onChange }: RatingControlsProps) {
    return (
      <div className="flex mt-2">
        {[...Array(10)].map((_, i) => (
          <button
            key={i}
            className={`w-7 h-7 flex items-center justify-center rounded-lg mx-1 hover:drop-shadow-xl ${
              value === i + 1 ? "bg-cyan-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => onChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
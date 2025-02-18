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
            className={`w-6 h-6 flex items-center justify-center text-sm border rounded-full mx-1 ${
              value === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
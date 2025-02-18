import RatingControls from "./RatingControls";

interface ImageGridProps {
  images: string[];
  ratings: number[];
  setRatings: (ratings: number[]) => void;
}

export default function ImageGrid({ images, ratings, setRatings }: ImageGridProps) {
  const updateRating = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={image} alt={`Image ${index}`} className="w-48 h-48 object-cover rounded-md shadow" />
          <RatingControls value={ratings[index]} onChange={(val) => updateRating(index, val)} />
        </div>
      ))}
    </div>
  );
}
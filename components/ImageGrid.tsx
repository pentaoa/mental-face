import RatingControls from "./RatingControls";
import React from "react";
import Image from "next/image";

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
          <Image src={image} alt={`Image ${index}`} width={256} height={256} className="object-cover drop-shadow-xl rounded-lg shadow" />
          <RatingControls value={ratings[index]} onChange={(val) => updateRating(index, val)} />
        </div>
      ))}
    </div>
  );
}
'use client';

import graystar from '@/public/graystar/material-symbols-light_star.png';
import lightstar from '@/public/star/material-symbols-light_star.png';
import Image from 'next/image';
import React from 'react';

interface RatingStarsProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, onRatingChange }) => {

  const handleClick = (index: number) => {
    if (index === rating) {
      onRatingChange(0); 
    } else {
      onRatingChange(index); 
    }
  };

  return (
    <div className="flex flex-col mt-9 max-w-full w-[150px] max-md:mt-10">
      <h2 className="text-lg font-semibold text-neutral-500">Reyting*</h2>
      <div className="flex gap-px items-center mt-2.5 w-full">
        {[1, 2, 3, 4, 5].map(star => (
          <Image
            key={star}
            loading="lazy"
            src={star <= rating ? lightstar : graystar}
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square cursor-pointer"
            alt={`Star ${star}`}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingStars;

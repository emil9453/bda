import React from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ReviewCardProps {
  src: StaticImageData;
  rating: number;
  reviewText: string;
  date: string;
  author: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ src, rating, reviewText, date, author }) => {
  return (
    <article className="flex flex-wrap gap-3.5 items-center mt-14 ml-5 max-md:mt-10">
      <Image
        loading="lazy"
        src={src}
        alt={`Profile picture of ${author}`}
        className="object-contain shrink-0 self-stretch my-auto rounded-2xl aspect-[1.01] w-[101px]"
      />
      <div className="flex flex-col items-start self-stretch my-auto min-w-[240px] w-[611px] max-md:max-w-full">
        <div className="flex gap-0.5 items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              loading="lazy"
              src={
                index < rating
                  ? 'https://cdn.builder.io/api/v1/image/assets/TEMP/a087267d461578e27b7cb1e781866269c3df60dd5ec8dccfbf6c188765a8937f?placeholderIfAbsent=true&apiKey=fd0e2a8355164cda9908396fdf2d7fe9'
                  : 'https://cdn.builder.io/api/v1/image/assets/TEMP/6ff75397070171d60455004c2184d86e41a78fdb1618ce8a8d6e6b44d50dc6b9?placeholderIfAbsent=true&apiKey=fd0e2a8355164cda9908396fdf2d7fe9'
              }
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          ))}
        </div>
        <p className="self-stretch mt-2.5 text-xl font-semibold tracking-wide leading-7 text-zinc-950 max-md:max-w-full">
          {reviewText}
        </p>
        <div className="flex gap-5 items-center mt-2.5 text-base tracking-wide leading-snug text-zinc-600">
          <time className="self-stretch my-auto">{date}</time>
          <span className="self-stretch my-auto">{author}</span>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;

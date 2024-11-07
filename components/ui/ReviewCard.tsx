'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import fullstar from '@/public/star/material-symbols-light_star.png';
import { SERVER_URL } from '../constants';
import { Doctors } from '../doctors';

interface ReviewCardProps {
  rating: number;
  comment: string;
  reviewDate: string;
  fullName: string;
  doctorFullName: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  comment,
  reviewDate,
  fullName,
  doctorFullName,
}) => {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_URL}/doctor/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const fetchedDoctors = await response.json();
      if (Array.isArray(fetchedDoctors)) {
        setDoctors(fetchedDoctors);
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // In Api,DoctorfullName is null,for this reson,i can't show doctor images

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'Yanvar',
      'Fevral',
      'Mart',
      'Aprel',
      'May',
      'İyun',
      'İyul',
      'Avqust',
      'Sentyabr',
      'Oktyabr',
      'Noyabr',
      'Dekabr',
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formattedDate = formatDate(reviewDate);

  const doctorPhotoUrl = doctors.find(d => d.fullName === doctorFullName)?.photoUrl;


  return (
    <article className="flex flex-wrap gap-3.5 items-center w-[49rem] mt-10 ml-5 max-md:mt-10">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <>
          {doctorPhotoUrl ? (
            <img
              src={doctorPhotoUrl}
              alt={`Profile picture of ${doctorFullName}`}
              width={101}
              height={100}
              className="object-cover shrink-0 self-stretch my-auto rounded-2xl aspect-[1.01] w-[101px]"
            />
          ) : (
            <div className="w-[101px] h-[100px] bg-gray-200 rounded-2xl"></div>
          )}
          <div className="flex flex-col items-start self-stretch my-auto min-w-[240px] w-[611px] max-md:max-w-full">
            <div
              className="flex gap-0.5 items-center"
              aria-label={`Rating: ${rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, index) => (
                <Image
                  key={index}
                  src={fullstar}
                  alt=""
                  width={24}
                  height={24}
                  className={`object-contain shrink-0 self-stretch my-auto w-6 aspect-square ${
                    index < rating ? 'opacity-100' : 'opacity-30'
                  }`}
                />
              ))}
            </div>
            <p className="self-stretch mt-2.5 text-xl font-semibold tracking-wide leading-7 text-zinc-950 max-md:max-w-full">
              {comment}
            </p>
            <div className="flex gap-5 items-center mt-2.5 text-base tracking-wide leading-snug text-zinc-600">
              <time className="self-stretch my-auto">{formattedDate}</time>
              <span className="self-stretch my-auto">{fullName}</span>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default ReviewCard;


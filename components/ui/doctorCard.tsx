import React from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import star from "@/public/star/material-symbols-light_star.png"
interface Doctor {
    name: string;
    specialty: string;
    rating: string;
    reviews: string;
    src: StaticImageData;
    description: string;
  }
interface DoctorCardProps {
    doctor: Doctor;
  }

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    const maxLength = 275; 
  const shortenedDescription = doctor.description.length > maxLength
    ? doctor.description.slice(0, maxLength) + '...'
    : doctor.description;
    return (
      <div className="flex flex-wrap gap-2 items-start mt-24 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex relative grow shrink gap-5 items-center min-w-[240px] w-[414px] max-md:max-w-full">
        <Image
  loading="lazy"
  src={doctor.src}
  alt={`Portrait of Dr. ${doctor.name}`}
  className="object-contain z-0 shrink-0 self-stretch my-auto aspect-[1.06] rounded-[466px] w-[183px]"
/>
          <div className="flex z-0 flex-col items-start self-stretch pr-12 my-auto min-w-[240px] w-[314px]">
            <div className="font-semibold underline text-neutral-800">
              {doctor.name}
            </div>
            <div className="mt-7 ml-2 text-neutral-800 max-md:ml-2.5">
              {doctor.specialty}
            </div>
            <div className="flex justify-center items-center gap-2.5 mt-6 text-black">
              <div className="flex whitespace-nowrap">
                <Image loading="lazy" alt='star' src={star} className="object-contain shrink-0 w-6 aspect-[1.06]" />
                <p className="my-auto text-base">{doctor.rating}</p>
              </div>
              <div className="flex  bottom-5 z-0 shrink-0 self-center w-3 h-3 bg-black rounded-full right-[193px]" />
              <p  className="my-auto basis-auto text-base w-28">{doctor.reviews} reviews</p>
            </div>
          </div>
          
        </div>
        <div className="grow shrink text-ellipsis text-neutral-800 w-[646px] max-md:max-w-full">
          <p className='font-serif text-base'>{shortenedDescription}</p>
        </div>
      </div>
    );
  };
  
  export default DoctorCard;



import React from 'react';
import Image from 'next/image';
import star from "@/public/star/material-symbols-light_star.png"
import location from "@/public/location/gridicons_location.png"
import { Doctors } from '../doctors';

interface DoctorCardProps {
    doctor: Doctors;
  }

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    const maxLength = 275; 
  const shortenedDescription = doctor.serviceDescription.length > maxLength
    ? doctor.serviceDescription.slice(0, maxLength) + '...'
    : doctor.serviceDescription;
    return (
      <div className="flex flex-wrap gap-2 items-start mt-24 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex relative grow shrink gap-5 items-center min-w-[240px] w-[414px] max-md:max-w-full">
        <img
  loading="lazy"
  src={doctor.photoUrl}
  alt={`Portrait of Dr. ${doctor.fullName}`}
  className="object-cover z-0 shrink-0 self-stretch my-auto aspect-[1.06] rounded-[466px] w-[183px]"
/>
          <div className="flex z-0 flex-col items-start self-stretch pr-12 my-auto min-w-[240px] w-[314px]">
            <div className="font-semibold underline text-neutral-800">
              {doctor.fullName}
            </div>
            <div className="mt-7 ml-2 text-neutral-800 max-md:ml-2.5">
             <p className='text-sm'> {doctor.speciality}</p>
            </div>
            <div className="flex mt-7 ml-2 text-neutral-800 max-md:ml-2.5" >
              <Image loading='lazy' alt='location' src={location}/>
              <p className='text-sm'>{`${doctor.clinics.map(c=>c.clinicName).join(" / ")}`}</p>
            </div>
            <div className="flex justify-center items-center gap-2.5 mt-6 text-black">
              <div className="flex whitespace-nowrap">
                <Image loading="lazy" alt='star' src={star} className="object-cover shrink-0 w-6 aspect-[1.06]"/>
                <p className="my-auto text-base">{doctor.reviews.map(r=>r.rating)}</p>
              </div>
              <div className="flex  bottom-5 z-0 shrink-0 self-center w-3 h-3 bg-black rounded-full right-[193px]" />
              <p  className="my-auto basis-auto text-base w-28">{doctor.reviews.length} reviews</p>
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



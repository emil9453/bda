// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import fullstar from '@/public/star/material-symbols-light_star.png';
// import { Doctors } from '../doctors';

// interface ReviewCardProps {
//   rating: number;
//   comment: string;
//   reviewDate: string;
//   fullName: string;
//   doctorFullName: string;
//   doctors: Doctors[];
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   rating,
//   comment,
//   reviewDate,
//   fullName,
//   doctorFullName,
//   doctors,
// }) => {
//   // In Api,DoctorfullName is null,for this reson,i can't show doctor images

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const months = [
//       'Yanvar',
//       'Fevral',
//       'Mart',
//       'Aprel',
//       'May',
//       'İyun',
//       'İyul',
//       'Avqust',
//       'Sentyabr',
//       'Oktyabr',
//       'Noyabr',
//       'Dekabr',
//     ];
//     return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
//   };

//   const formattedDate = formatDate(reviewDate);

//   const doctorPhotoUrl = doctors.find(d => d.fullName === doctorFullName)?.photoUrl;

//   return (
//     <article className="flex flex-wrap gap-3.5 items-center w-[49rem] mt-10 ml-5 max-md:mt-10">
//       {
//         <>
//           {doctorPhotoUrl ? (
//             <img
//               src={doctorPhotoUrl}
//               alt={`Profile picture of ${doctorFullName}`}
//               width={101}
//               height={100}
//               className="object-cover shrink-0 self-stretch my-auto rounded-2xl aspect-[1.01] w-[101px]"
//             />
//           ) : (
//             <div className="w-[101px] h-[100px] bg-gray-200 rounded-2xl"></div>
//           )}
//           <div className="flex flex-col items-start self-stretch my-auto min-w-[240px] w-[611px] max-md:max-w-full">
//             <div
//               className="flex gap-0.5 items-center"
//               aria-label={`Rating: ${rating} out of 5 stars`}
//             >
//               {[...Array(5)].map((_, index) => (
//                 <Image
//                   key={index}
//                   src={fullstar}
//                   alt=""
//                   width={24}
//                   height={24}
//                   className={`object-contain shrink-0 self-stretch my-auto w-6 aspect-square ${
//                     index < rating ? 'opacity-100' : 'opacity-30'
//                   }`}
//                 />
//               ))}
//             </div>
//             <p className="self-stretch mt-2.5 text-xl font-semibold tracking-wide leading-7 text-zinc-950 max-md:max-w-full">
//               {comment}
//             </p>
//             <div className="flex gap-5 items-center mt-2.5 text-base tracking-wide leading-snug text-zinc-600">
//               <time className="self-stretch my-auto">{formattedDate}</time>
//               <span className="self-stretch my-auto">{fullName}</span>
//             </div>
//           </div>
//         </>
//       }
//     </article>
//   );
// };

// export default ReviewCard;

import React from 'react';
import Image from 'next/image';
import fullstar from '@/public/star/material-symbols-light_star.png';
import { Doctors } from '../doctors';

interface ReviewCardProps {
  rating: number;
  comment: string;
  reviewDate: string;
  fullName: string;
  doctorFullName: string;
  doctors: Doctors[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  comment,
  reviewDate,
  fullName,
  doctorFullName,
  doctors,
}) => {
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
    <article className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl min-w-80 mx-auto p-4 bg-white rounded-lg shadow-md mb-6">
      <div className="w-full sm:w-auto flex flex-col justify-center sm:justify-start">
        {doctorPhotoUrl ? (
          <img
            src={doctorPhotoUrl}
            alt={`Profile picture of ${doctorFullName}`}
            width={100}
            height={100}
            className="object-cover rounded-full aspect-square w-24 h-24 sm:w-[100px] sm:h-[100px]"
          />
        ) : (
          <div className="w-24 h-24 sm:w-[100px] sm:h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-xl">No Image</span>
          </div>
        )}
        <div><p className='text-sm mt-1 text-zinc-600'>{doctorFullName}</p></div>
      </div>
      <div className="flex flex-col items-start flex-grow">
        <div
          className="flex gap-0.5 items-center mb-2"
          aria-label={`Rating: ${rating} out of 5 stars`}
        >
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              src={fullstar}
              alt=""
              width={20}
              height={20}
              className={`object-contain w-5 h-5 ${index < rating ? 'opacity-100' : 'opacity-30'}`}
            />
          ))}
        </div>
        <p className="text-base sm:text-lg font-semibold tracking-wide leading-6 text-zinc-950 mb-2">
          {comment}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm tracking-wide leading-snug text-zinc-600">
          <time dateTime={reviewDate}>{formattedDate}</time>
          <span className="hidden sm:inline">•</span>
          <span>{fullName}</span>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;

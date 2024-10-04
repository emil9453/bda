'use client';

// import React from 'react';

// const RatingStars: React.FC = () => {
//   return (
//     <div className="flex flex-col mt-14 max-w-full w-[150px] max-md:mt-10">
//       <h2 className="text-2xl font-semibold text-neutral-500">Rating*</h2>
//       <div className="flex gap-px items-center mt-2.5 w-full">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <img
//             key={star}
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5b1b02bc6472692defe39af0719a504cad74e74c70fe7fb5bf48a7535b803c2?placeholderIfAbsent=true&apiKey=fd0e2a8355164cda9908396fdf2d7fe9"
//             className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
//             alt={`Star ${star}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RatingStars;

import React, { useState } from 'react';
import graystar from "@/public/graystar/material-symbols-light_star.png";
import lightstar from "@/public/star/material-symbols-light_star.png";
import Image from 'next/image';

const RatingStars: React.FC = () => {
  const [rating, setRating] = useState(0); // Yıldız derecelendirmesini saklamak için durum

  const handleClick = (index: number) => {
    // Eğer tıklanan yıldız, mevcut derecelendirme ile aynıysa, derecelendirmeyi sıfırla
    if (index === rating) {
      setRating(0);
    } else {
      setRating(index); // Tıklanan yıldızın indeksini ayarla
    }
  };

  return (
    <div className="flex flex-col mt-12 max-w-full w-[150px] max-md:mt-10">
      <h2 className="text-2xl font-semibold text-neutral-500">Rating*</h2>
      <div className="flex gap-px items-center mt-2.5 w-full">
        {[1, 2, 3, 4, 5].map((star) => (
          <Image
            key={star}
            loading="lazy"
            src={star <= rating ? lightstar : graystar} // Tıklanan yıldızın durumuna göre resmi değiştir
            className={`object-contain shrink-0 self-stretch my-auto w-6 aspect-square cursor-pointer`}
            alt={`Star ${star}`}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingStars;



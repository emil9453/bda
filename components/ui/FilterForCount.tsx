import React, { useState } from 'react';
import Link from 'next/link';

const FilterForCount: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('rating'); 

  return (
    <div className="flex justify-center items-center space-x-10 mt-5">
      {/* Reytinqə görə sıralama linki */}
      <Link
        href="http://64.226.99.16:8090/api/v1/doctor?sortBy=averageRating"
        onClick={() => setActiveLink('rating')}
        className="relative text-lg font-semibold text-neutral-700 cursor-pointer"
      >
        Reytinqə görə sıralama
        {activeLink === 'rating' && (
          <div className="absolute left-0 right-0 h-[3px] mt-1 bg-[rgba(255,145,2,1)]"></div>
        )}
      </Link>

      {/* Rəy sayına görə sıralama linki */}
      <Link
        href="http://64.226.99.16:8090/api/v1/doctor?sortBy=reviewCount"
        onClick={() => setActiveLink('reviewCount')}
        className="relative text-lg font-semibold text-neutral-700 cursor-pointer"
      >
        Rəy sayına görə sıralama
        {activeLink === 'reviewCount' && (
          <div className="absolute left-0 right-0 h-[3px] mt-1 bg-[rgba(255,145,2,1)]"></div>
        )}
      </Link>
    </div>
  );
};

export default FilterForCount;


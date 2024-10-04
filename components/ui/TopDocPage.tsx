import React from 'react';
import ReviewCard from './ReviewCard';
import SearchBar from './SearchBar';
import Link from 'next/link';
import ReviewArray from './reviews';

const TopDocPage: React.FC = () => {
  return (
    <>
      <header className="flex overflow-hidden flex-col pr-20 pb-32 bg-white max-md:pr-5 max-md:pb-24">
        <section className="flex flex-wrap gap-5 justify-between text-stone-50 max-md:max-w-full">
          <div className="flex overflow-hidden relative flex-col px-16 py-24 text-4xl font-bold whitespace-nowrap aspect-[1.238] fill-amber-500 max-md:px-5 max-md:pb-24">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/78c90729b7081918cf4855d35b56b10e41b725ae016629e795db2969e9998b55?placeholderIfAbsent=true&apiKey=fd0e2a8355164cda9908396fdf2d7fe9"
              alt=""
              className="object-cover absolute inset-0 size-full"
            />
            <span className="absolute top-[55px] left-[38px] font-kyiv">Topdoc</span>
          </div>
          <Link
            href="/addreview"
            className="overflow-hidden px-4 py-3 my-auto text-xl font-semibold bg-amber-500 rounded-lg"
          >
            + Add Review
          </Link>
        </section>
      </header>
      <section className="flex mx-auto flex-col items-start self-center mt-28 mb-16 w-full max-w-[1097px] max-md:mt-10 max-md:max-w-full">
        <h1 className="ml-5 text-4xl font-semibold text-black max-md:max-w-full">
          Search Local Doctors
        </h1>
        <SearchBar />
        <h2 className="self-center mt-36 text-2xl font-semibold text-black max-md:mt-10">
          The most popular reviews
        </h2>
        {ReviewArray.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </section>
    </>
  );
};

export default TopDocPage;

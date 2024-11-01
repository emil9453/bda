'use client';

import { useState } from 'react';

import { CreateProfile } from '../createprofile/CreateProfile';

export function SearchBar() {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const ToggleReviewForm = () => {
    setIsReviewFormOpen(!isReviewFormOpen);
  };

  const HandleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'overlay') {
      setIsReviewFormOpen(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 mt-16 w-full  max-md:mt-10 max-md:max-w-full">
      <form className="flex overflow-hidden flex-wrap  justify-between flex-auto px-6 py-2 rounded-lg border border-solid border-neutral-400 max-md:pl-5 max-md:max-w-full">
        <label htmlFor="search" className="sr-only">
          Filter and search
        </label>
        <input
          id="search"
          type="search"
          className="my-auto text-xl text-stone-400 w-[85%] bg-transparent border-none outline-none"
          placeholder="Filter and search"
        />
        <div className="flex gap-6">
          <div className="shrink-0 w-px border border-solid bg-neutral-400 border-neutral-400 h-[39px]" />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c6fa2c1121420f0d91da96e0dea5b275cd3cea64fdfc6ad2dc22b8a4ee55dc2?placeholderIfAbsent=true&apiKey=5ba75a88538f4558b4c858630355e7bb"
            alt=""
            className="object-contain shrink-0 self-start aspect-[1.03] w-[35px]"
          />
        </div>
      </form>
      <button
        onClick={ToggleReviewForm}
        className="flex gap-2 items-center self-start px-2 py-2 mt-1 text-xl font-semibold text-white bg-amber-500 rounded-lg"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/97c4e4b8ffc520ce93172e06941aedf0a4e03538d6ede9f9f75bfdcbf7823580?placeholderIfAbsent=true&apiKey=5ba75a88538f4558b4c858630355e7bb"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <span data-layername="yeniHesab" className="self-stretch my-auto">
          Yeni hesab
        </span>
      </button>

      {/* Overlay */}
      {isReviewFormOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={HandleClickOutside}
        ></div>
      )}

      {/* Sliding Review Form */}
      <div
        className={`fixed top-0 right-0 overflow-scroll h-[600px] w-[400px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CreateProfile />
      </div>
    </div>
  );
}

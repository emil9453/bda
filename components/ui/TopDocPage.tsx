"use client"
import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import SearchBar from './SearchBar';
import ReviewArray from './reviews';
import ReviewForm from '../AddReview/ReviewForm';


const TopDocPage: React.FC = () => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const ToggleReviewForm = ()=>{
    setIsReviewFormOpen(!isReviewFormOpen);
  }

  const HandleClickOutside = (e: React.MouseEvent)=>{
     if((e.target as HTMLElement).id === "overlay"){
      setIsReviewFormOpen(false);
     }
  }

  return (
    <>
      <header className="flex relative overflow-hidden flex-col pr-20 pb-32 bg-white max-md:pr-5 max-md:pb-24">
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
             
          
            <button onClick={ToggleReviewForm} className="overflow-hidden px-4 py-3 my-auto text-xl font-semibold bg-amber-500 rounded-lg">
          
            + Yeni Rəy
            </button>
          
        </section>
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
  className={`fixed top-14 h-full overflow-scroll hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
    isReviewFormOpen ? 'translate-x-1/4' : '-translate-x-full'
  }`}
  style={{ width: '824px'}}
>
  <ReviewForm onSubmit={(formData) => console.log("Form Submitted", formData)} />
</div>


      </header>

      <section className="flex mx-auto flex-col items-start self-center mt-28 mb-16 w-full max-w-[1097px] max-md:mt-10 max-md:max-w-full">
        <h1 className="ml-5 text-5xl leading-tight font-semibold text-black max-md:max-w-[926px]">
        “Sağlamlığınıza etibar etdiyiniz həkimi seçin, həyatınızı daha sağlam yaşayın!”
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





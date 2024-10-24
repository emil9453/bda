"use client"
import React, { useState } from 'react';
import ReviewForm from '../AddReview/ReviewForm';
// import ReviewCard from './ReviewCard';
import SearchBar from './SearchBar';
// import ReviewArray from './reviews';
import plus from "@/public/plusSvg/PlusCircle.svg"
import Image from 'next/image';
import notepad from '@/public/Notepad/notepad.png'
import injection from '@/public/injection/injection.png'
import thermometer from '@/public/thermometer/thermometer.png'


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
      <header className="flex relative overflow-hidden flex-col pr-20  bg-white max-md:pr-5 max-md:pb-24">
        <section className="flex flex-wrap gap-5 justify-between text-stone-50 max-md:max-w-full">
          <div className="flex overflow-hidden relative flex-col px-16 py-24 text-4xl font-bold whitespace-nowrap aspect-[1.238] fill-amber-500 max-md:px-5 max-md:pb-24">
            
          </div>
             
          
            <button onClick={ToggleReviewForm} className="w-[105px] my-7 h-[32px] p-[20px_8px]  flex gap-[8px] items-center rounded-[8px] bg-[rgba(255,174,53,1)] ">
          
            <Image src={plus} alt='plus'/> Yeni Rəy
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
 className={`fixed top-0 right-0 overflow-scroll h-[600px] w-[400px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
  isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
}`}

>
  <ReviewForm onSubmit={(formData) => console.log("Form Submitted", formData)} doctorName={''} clinic={''} specialty={''} />
</div>


      </header>

      <section className="flex mx-auto flex-col items-start self-center mt-8 mb-16 w-full max-w-[1097px] max-md:mt-10 max-md:max-w-full">
      
        <div className='flex items-center gap-10'>
        <div className='w-[820px] h-[108px]'>
           <h1 className='text-[32px] text-[rgba(255,145,2,1)] font-semibold leading-[54px] text-left'>
           “Sağlamlığınızı etibar etdiyiniz həkimi seçin, həyatınızı daha sağlam yaşayın!”
           </h1>
        </div>
          <div className='relative'>
              <Image src={notepad} alt='notepad'/>
              <div className='absolute top-36 right-[-5rem]'>
                <Image src={injection} alt='injection'/>
              </div>
              <div className='absolute top-36 left-[-6rem]'>
                  <Image src={thermometer} alt='thermometer'/>
              </div>
              
          </div>
          
        </div>
        <SearchBar />
        {/* <h2 className="self-center mt-36 text-2xl font-semibold text-black max-md:mt-10">
          The most popular reviews
        </h2>
        {ReviewArray.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))} */}

        <div className='h-[435px]'>

        </div>
      </section>
    </>
  );
};

export default TopDocPage;





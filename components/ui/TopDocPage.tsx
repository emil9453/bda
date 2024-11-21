'use client';

import React, { useState } from 'react';
import ReviewForm from '../AddReview/ReviewForm';
import SearchBar from './SearchBar';
import plus from '@/public/plusSvg/PlusCircle.svg';
import Image from 'next/image';
import notepad from '@/public/Notepad/notepad.png';
import injection from '@/public/injection/injection.png';
import thermometer from '@/public/thermometer/thermometer.png';
import { Toaster } from 'react-hot-toast';
import Cardiologist from '@/public/cardiologist/5 - Cardiologist.png';
import ReviewCard from './ReviewCard';
import { getAllReviews } from '@/lib/api/getAllReviews';
import { useQuery } from '@tanstack/react-query';

const TopDocPage: React.FC = () => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [doctors, setDoctors] = useState<any>([]);

  const { data: reviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: getAllReviews,
  });

  const ToggleReviewForm = () => {
    setIsReviewFormOpen(!isReviewFormOpen);
  };

  const HandleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'overlay') {
      setIsReviewFormOpen(false);
    }
  };

  return (
    <>
      <header className="flex relative  overflow-hidden flex-col px-4 sm:px-6 lg:px-8 bg-white">
        <section className="flex flex-wrap gap-5 sm:flex-row xs-col-reverse justify-between text-stone-50">
          <div className="flex overflow-hidden relative xs-h flex-col py-12 sm:py-16 lg:py-24 text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap aspect-[1.238] fill-amber-500"></div>

          <button
            onClick={ToggleReviewForm}
            className="w-full  my-4 sm:w-[140px] sm:my-7 h-10 sm:h-[50px] px-4 py-2 flex gap-2 items-center justify-center rounded-[8px] bg-[rgba(255,174,53,1)] text-sm sm:text-base"
          >
            <Image src={plus} alt="plus" width={20} height={20} /> Yeni Rəy
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
          className={`fixed top-0 right-0 overflow-scroll h-full w-2/3 sm:w-[400px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ReviewForm
            onSubmit={(formData: any) => {
              console.log('Form Submitted', formData);
              setIsReviewFormOpen(false);
            }}
            doctorName={''}
            clinic={''}
            specialty={''}
            setIsReviewFormOpen={setIsReviewFormOpen}
            fullName=""
            reviewtext=""
          />
        </div>
      </header>

      <section className="flex mx-auto flex-col items-start self-center mb-8 sm:mb-16 w-full max-w-[1097px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="w-full sm:w-[820px]">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] text-[rgba(255,145,2,1)] font-semibold leading-tight sm:leading-[54px] text-center sm:text-left">
  &quot;Sağlamlığınızı etibar etdiyiniz həkimi seçin, həyatınızı daha sağlam yaşayın!&quot;
</h1>

          </div>
          <div className="relative w-full sm:w-auto mt-6 sm:mt-0">
            <Image src={notepad} alt="notepad" className="mx-auto sm:mx-0" />
            <div className="absolute top-full sm:top-36 right-0 sm:right-[-5rem] mt-4 sm:mt-0">
              <Image src={injection} alt="injection" />
            </div>
            <div className="absolute top-full sm:top-36 left-0 sm:left-[-6rem] mt-4 sm:mt-0">
              <Image src={thermometer} alt="thermometer" />
            </div>
          </div>
        </div>
        <div className="w-full mt-8 sm:mt-16">
          <SearchBar
            onDoctorsFetch={fetchedDoctors => setDoctors(fetchedDoctors)}
            onSearch={query => window.location.replace(`search-results?${query}`)}
          />
        </div>
      </section>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-44 w-full mt-12 sm:mt-28 mb-8">
        <div className="w-full sm:w-[35rem] order-2 sm:order-1">
          {doctors &&
            reviews
              ?.filter(r => r.status === 'APPROVED')
              .slice(-3)
              .map((review, index) => <ReviewCard doctors={doctors} key={index} {...review} />)}
        </div>
        <Image src={Cardiologist} alt="cardiolog" className="w-full sm:h-[300px] sm:w-auto order-1 sm:order-2" />
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default TopDocPage;



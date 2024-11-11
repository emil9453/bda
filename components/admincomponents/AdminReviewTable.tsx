
'use client';

import { useState, useMemo } from 'react';
import { Pencil } from 'lucide-react';
import React from 'react';
import ReviewFormForCheck from '../AddReview/ReviewFormForCheck';
import Image from 'next/image';
import pending from '@/public/stasuses/pending.png';
import aproved from '@/public/stasuses/approved.png';
import rejected from '@/public/stasuses/rejected.png';
import { useQuery } from '@tanstack/react-query';
import { getAllDoctors } from '@/lib/api';
import TableLoading from './TableLoading';

interface Clinics {
  clinicId: number;
  clinicName: string;
  location: string;
  contactDetails: string;
  city: string;
  distance: string;
}

interface Reviews {
  rating: number;
  comment: string;
  reviewDate: string;
  fullName: string;
  status: string;
  reviewId: number;
}

interface Doctor {
  doctorId: number;
  fullName: string;
  speciality: string;
  clinics: Clinics[];
  days: string;
  address: string;
  active: boolean;
  reviews: Reviews[];
}

export default function AdminReviewTable() {
  const {
    isPending,
    error,
    data: doctors,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: getAllDoctors,
  });

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedReview, setSelectedReview] = useState<Reviews | null>(null);

  const HandleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'overlay') {
      setIsReviewFormOpen(false);
    }
  };

  const sortedReviews = useMemo(() => {
    if (!doctors) return [];
    return doctors.flatMap(doctor => 
      doctor.reviews.map(review => ({
        ...review,
        doctorName: doctor.fullName,
        clinicNames: doctor.clinics.map(c => c.clinicName).join(', ')
      }))
    ).sort((a, b) => {
      if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
      if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
      return 0;
    });
  }, [doctors]);

  if (isPending)
    return (
      <div className="px-20 mt-[100px]">
        <h1 className="text-2xl mb-3">All Reviews</h1>
        <TableLoading columns={6} rows={8} />
      </div>
    );

  if (error) return 'An error has occurred: ' + error.message;

  const openReviewForm = (review: Reviews & { doctorName: string; clinicNames: string }) => {
    const doctor = doctors.find(d => d.fullName === review.doctorName);
    if (doctor) {
      setSelectedDoctor(doctor);
      setSelectedReview(review);
      setIsReviewFormOpen(true);
    }
  };

  return (
    <>
      <main className="flex max-w-100 overflow-hidden flex-col pb-0 bg-white max-md:pb-24">
        {isReviewFormOpen && (
          <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={HandleClickOutside}
          ></div>
        )}

        <div
          className={`fixed top-0 right-0 overflow-scroll h-full flex items-center justify-center w-[600px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {selectedDoctor && selectedReview && (
            <ReviewFormForCheck
              doctorName={selectedDoctor.fullName}
              clinic={selectedDoctor.clinics.map(c => c.clinicName).join(', ')}
              specialty={selectedDoctor.speciality}
              setIsReviewFormOpen={setIsReviewFormOpen}
              fullname={selectedReview.fullName}
              reviewtext={selectedReview.comment}
              rating={selectedReview.rating}
              reviewId={selectedReview.reviewId}
            />
          )}
        </div>

        <section className="flex flex-col px-20 mb-4 mt-24 w-full max-md:px-5 max-md:mt-2 max-md:max-w-full">
          <h1 className="text-2xl">All Reviews</h1>
          <div className="container max-w-full mx-auto py-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[rgba(255,179,0,1)]">
                  <th className="border-none p-4 text-left">Ad, soyad</th>
                  <th className="border-none p-4 text-left">Həkim</th>
                  <th className="border-none p-4 text-left">Klinika</th>
                  <th className="border-none p-4 text-left">Rəylər</th>
                  <th className="border-none p-4 text-left">Status</th>
                  <th className="border-none p-4 text-left">Reytinq</th>
                  <th className="border-none p-4 text-left">Tənzimləmələr</th>
                </tr>
              </thead>
              <tbody>
                {sortedReviews.map((review, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    <td className="py-4 px-2">{review.fullName}</td>
                    <td className="py-4 px-2">{review.doctorName}</td>
                    <td className="py-4 px-2">{review.clinicNames}</td>
                    <td className="py-4 px-2">{review.comment}</td>
                    <td className="py-4 px-2">
                      <Image
                        src={
                          review.status === 'APPROVED'
                            ? aproved
                            : review.status === 'PENDING'
                            ? pending
                            : rejected
                        }
                        alt="status"
                      />
                    </td>
                    <td className="py-4 px-2 text-center">{review.rating}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openReviewForm(review)}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
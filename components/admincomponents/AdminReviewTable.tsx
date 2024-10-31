'use client';

import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import React from 'react';
import ReviewFormForCheck from '../AddReview/ReviewFormForCheck';
import Image from 'next/image';
import pending from '@/public/stasuses/pending.png';
import aproved from '@/public/stasuses/approved.png';
import rejected from '@/public/stasuses/rejected.png';

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
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedReview, setSelectedReview] = useState<Reviews | null>(null);
  // const [reviewStatus, setReviewStatus] = useState<Reviews['status']>('Pending');

  // const ToggleReviewForm = () => {
  //   setIsReviewFormOpen(!isReviewFormOpen);
  // }

  const HandleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'overlay') {
      setIsReviewFormOpen(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://64.226.99.16/api/v1/doctor/all', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const DocArray = await response.json();
      setDoctors(DocArray);
      console.log(DocArray);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openReviewForm = (doctor: Doctor, review: Reviews) => {
    setSelectedDoctor(doctor);
    setSelectedReview(review);
    setIsReviewFormOpen(true);
  };

  return (
    <>
      <main className="flex overflow-hidden flex-col pb-0 bg-white max-md:pb-24">
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
          className={`fixed top-0 right-0 overflow-scroll h-full flex items-center justify-center w-[400px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {selectedDoctor && selectedReview && (
            <ReviewFormForCheck
              onSubmit={(formData: any) => {
                console.log('Form Submitted', formData);
                setIsReviewFormOpen(false);
              }}
              doctorName={selectedDoctor.fullName}
              clinic={selectedDoctor.clinics.map(c => c.clinicName).join(', ')}
              specialty={selectedDoctor.speciality}
              setIsReviewFormOpen={setIsReviewFormOpen}
              fullname={selectedReview.fullName}
              reviewtext={selectedReview.comment}
              rating={selectedReview.rating}
            />
          )}
        </div>

        <section className="flex flex-col px-20 mb-4 mt-24 w-full max-md:px-5 max-md:mt-2 max-md:max-w-full">
          <h2>All Reviews</h2>
          <div className="container mx-auto py-10">
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
                {doctors.map(doctor => (
                  <React.Fragment key={doctor.doctorId}>
                    {doctor.reviews.map((review, index) => (
                      <tr key={index} className="bg-blue-50">
                        <td className="py-4 px-2">{review.fullName}</td>
                        <td className="py-4 px-2">{doctor.fullName}</td>
                        <td className="py-4 px-2">
                          {doctor.clinics.map(c => c.clinicName).join(', ')}
                        </td>
                        <td className="py-4 px-2">{review.comment}</td>
                        <td className="py-4 px-2">
                          {' '}
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
                              onClick={() => openReviewForm(doctor, review)}
                              className="text-gray-600 hover:text-blue-600"
                            >
                              <Pencil size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

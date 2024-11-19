'use client';
import ReviewForm from '@/components/AddReview/ReviewForm';
import { SERVER_URL } from '@/components/constants';
import { Doctors } from '@/components/doctors';
import location from '@/public/location/gridicons_location.png';
import stars from '@/public/stars/stars.png';
import { Mail, MapPin, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import plus from '@/public/plusSvg/PlusCircle.svg';

interface PageProps {
  params: Promise<{ doctorId: string }>;
}

export default function DoctorProfile({ params }: PageProps) {
  const { doctorId } = use(params);
  const [doctor, setDoctor] = useState<Doctors | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');
  const [activeClinic, setActiveClinic] = useState<number>(0);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const weekDayMapping: { [key: string]: string } = {
    'Sunday': 'Bazar',
    'Monday': 'B.e',
    'Tuesday': 'Ç.a',
    'Wednesday': 'Ç',
    'Thursday': 'C.a',
    'Friday': 'C',
    'Saturday': 'Şənbə'
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


  const ToggleReviewForm = () => {
    setIsReviewFormOpen(!isReviewFormOpen);
  };

  const HandleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'overlay') {
      setIsReviewFormOpen(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetch(`${SERVER_URL}/doctor/${doctorId}`)
        .then(res => res.json())
        .then(data => setDoctor(data));
    }
  }, [doctorId]);

  useEffect(() => {
    if (doctor?.clinics && doctor.clinics.length > 0) {
      setActiveClinic(0);
    }
  }, [doctor?.clinics]);

  if (!doctor) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isReviewFormOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={HandleClickOutside}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 overflow-scroll h-full w-2/3 sm:w-[400px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ReviewForm
          onSubmit={formData => console.log('Form Submitted', formData)}
          doctorName={doctor.fullName}
          specialty={doctor.speciality}
          setIsReviewFormOpen={setIsReviewFormOpen}
          fullname={''}
          doctorId={doctor.doctorId}
          clinic={doctor.clinics.map(c=>c.clinicName).join("/")}
          reviewtext={''}
        />
      </div>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <main className="flex-grow container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/5">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.fullName}
                  className="w-full sm:w-[150px] h-[150px] rounded-sm object-cover"
                />
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between">
                    <h2 className="font-bold font-publicSans text-xl sm:text-2xl leading-tight mb-2 sm:mb-0">
                      {doctor.fullName}
                    </h2>
                    <button
                      className="overflow-hidden flex items-center gap-2 text-stone-50 w-full sm:w-[105px] h-8 rounded-lg py-1 px-2 my-2 sm:my-auto text-sm font-semibold bg-amber-500"
                      onClick={ToggleReviewForm}
                    >
                      <Image src={plus} alt="plus" width={20} height={20} /> Yeni Rəy
                    </button>
                  </div>
                  <p className="text-[#262626] font-normal text-base sm:text-lg leading-tight my-2 sm:my-[31px]">
                    {doctor.speciality}
                  </p>
                  <div className="flex gap-1 items-center">
                    <Image src={location} alt="location" width={20} height={20} />
                    <p className="text-sm text-gray-500">
                      {doctor.clinics
                        ? doctor.clinics.map(c => c.clinicName).join(' / ')
                        : 'No clinics available'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-[710px] flex flex-col sm:flex-row h-auto sm:h-[145px] p-4 sm:p-[12px_10px] gap-4 sm:gap-[40px] rounded-sm shadow-custom-shadow">
                <div className="flex sm:flex-col items-center gap-2 sm:gap-[12px]">
                  <p className="font-poppins text-xl font-semibold leading-9 text-center">
                    {doctor?.reviews.length > 0 ? doctor.reviews[0].rating : 'N/A'}
                  </p>
                  <Star className="w-[35.6px] h-[31.72px] text-yellow-400" fill="currentColor" />
                </div>
                <div className="hidden sm:block h-[105px] w-[2px] gap-0 border-t border-gray-500 bg-[#959595]"></div>
                <div className="flex flex-col">
                  <p className="text-lg sm:text-xl font-semibold leading-tight sm:leading-9 text-left">
                    {`"${
                      doctor.reviews.length > 0
                        ? doctor.reviews.filter(r=>r.status === "APPROVED").at(-1)?.comment
                        : ''
                    }"`}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {doctor.reviews.length > 0 &&
                      (() => {
                        const lastReview = doctor.reviews[doctor.reviews.length - 1];
                        const date = new Date(lastReview.reviewDate);
                        const months = [
                          'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
                          'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
                        ];
                        const formattedDate = `${date.getDate()} ${
                          months[date.getMonth()]
                        } ${date.getFullYear()}`;
                        return <p className="text-sm">{formattedDate}</p>;
                      })()}
                    <div className="w-[5px] h-[5px] bg-[#D9D9D9] rounded-full mx-[18px]"></div>
                    <p className="text-sm">{doctor.reviews[doctor.reviews.length - 1]?.fullName}</p>
                  </div>
                </div>
              </div>

              <div className="flex my-6 text-sm">
                <button
                  className={`mx-1 py-1 w-full sm:w-[120px] h-[44px] rounded px-2 ${
                    activeTab === 'about' ? 'bg-orange-400 text-white' : 'bg-white'
                  }`}
                  onClick={() => setActiveTab('about')}
                >
                  Haqqında
                </button>
                <button
                  className={`py-1 w-full sm:w-[120px] h-[44px] rounded px-3 ${
                    activeTab === 'reviews' ? 'bg-orange-400 text-white' : 'bg-white'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Rəylər
                </button>
              </div>

              {activeTab === 'about' && (
                <div>
                  <h3 className="font-bold mb-2">Ad soyad</h3>
                  <p className="mb-4">{doctor.fullName}</p>

                  <h3 className="font-bold mb-2">Universitet</h3>
                  <p className="mb-4">Azərbaycan Dövlət Tibb Universiteti</p>

                  <h3 className="font-bold mb-2">İxtisas</h3>
                  <p>{doctor.speciality}</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="flex flex-col h-[260px] overflow-scroll hidden-scrollbar">
                  {doctor.reviews
                    .filter(r => r.status === 'APPROVED')
                    .map((r, index) => (
                      <div key={index} className="flex flex-col gap-[13px] mb-4">
                        <Image src={stars} alt="stars" width={100} height={20} />
                        <p className="text-sm sm:text-base">&quot; {r.comment} &quot;</p>
                        <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                          <p>{r.fullName}</p>
                          <p>{new Date(r.reviewDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="lg:w-2/5 border w-full lg:w-[460px] h-auto lg:h-[694px] p-4 lg:p-[45px] border-[#FFB300]">
              <h3 className="font-bold mb-2">Klinikalar</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {doctor.clinics?.map((clinic, index) => (
                  <button
                    key={index}
                    className={`py-2 w-full sm:w-[174px]  px-4 rounded ${
                      activeClinic === index ? 'bg-orange-400 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setActiveClinic(index)}
                  >
                    {clinic.clinicName}
                  </button>
                ))}
              </div>

              {doctor.clinics?.length > 0 && (
                <div>
                  <div className="w-full sm:w-[218px]">
                    <p className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2" /> {doctor.clinics[activeClinic]?.city}
                    </p>
                    <p className="flex items-center mb-2">
                      <Phone className="w-4 h-4 mr-2" />{' '}
                      {doctor.clinics[activeClinic]?.contactDetails}
                    </p>
                    <p className="flex items-center mb-4">
                      <Mail className="w-4 h-4 mr-2" /> bmpbabek@bmp.az
                    </p>
                  </div>

                  <h4 className="font-bold mb-2">İş günləri</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                  {daysOfWeek.map((day) => {
              const schedule = doctor.clinics[activeClinic]?.schedules.find(
                (s: any) => s.weekDay.toLowerCase() === day.toLowerCase()
              )
              const isAvailable = !!schedule
              const bgColor = isAvailable ? 'bg-orange-400 text-white' : 'bg-gray-100'

              return (
                <div key={day} className={`p-2 rounded ${bgColor}`}>
                  <p className="font-bold">{weekDayMapping[day]}</p>
                  {isAvailable ? (
                    <p className="text-sm">{`${schedule.workingHoursFrom}-${schedule.workingHoursTo}`}</p>
                  ) : (
                    <p className="text-sm">İstirahət günü</p>
                  )}
                </div>
              )
            })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Toaster position="top-center" />
      </div>
    </>
  );
}
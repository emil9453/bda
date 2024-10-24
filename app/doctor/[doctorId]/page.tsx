'use client';
import ReviewForm from '@/components/AddReview/ReviewForm';
import { Doctors } from '@/components/doctors';
import location from '@/public/location/gridicons_location.png';
import stars from '@/public/stars/stars.png';
import { Mail, MapPin, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DoctorProfile({
  params,
}: {
  params: {
    doctorId: string;
  };
}) {
  const { doctorId } = params;
  const [doctor, setDoctor] = useState<Doctors | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');
  const [activeClinic, setActiveClinic] = useState<number>(0);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const ToggleReviewForm = () => {
    setIsReviewFormOpen(!isReviewFormOpen);
  };

  const HandleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "overlay") {
      setIsReviewFormOpen(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetch(`http://64.226.99.16:8090/api/v1/doctor/${doctorId}`)
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
  <ReviewForm
   onSubmit={(formData) => console.log("Form Submitted", formData)}
   doctorName={doctor.fullName}
   clinic={doctor.clinics[0]?.clinicName || ''}
   specialty={doctor.speciality}
   />
</div>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <main className="flex-grow container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md justify-between p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-3/5">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.fullName}
                  className="w-[150px] h-[150px] rounded-sm"
                />
                <div>
                  <div className="flex items-end">
                    <h2 className="font-semibold text-2xl leading-12">{doctor.fullName}</h2>
                  </div>
                  <p className="text-[#262626] font-normal text-lg leading-[30px] my-[31px]">
                    {doctor.speciality}
                  </p>
                  <div className="flex gap-1">
                    <Image src={location} alt="location" />
                    <p className="text-sm text-gray-500">
                      {doctor.clinics
                        ? doctor.clinics.map(c => c.clinicName).join(' / ')
                        : 'No clinics available'}
                    </p>
                  </div>
                  <div className="flex items-center mt-2"></div>
                </div>
                <div className='flex justify-end w-[280px]'>
                  <button className="overflow-hidden text-stone-50 px-4 py-3 my-auto text-xl font-semibold bg-amber-500 rounded-lg" onClick={ToggleReviewForm}>
                    + Yeni Rəy
                  </button>
                </div>
              </div>

              <div className="w-[710px] flex h-[145px] p-[12px_10px] gap-[40px] rounded-tl-lg shadow-md">
                <div className="w-[78px] h-[121px] pt-[10px] gap-[12px] items-center flex flex-col">
                  <p className="font-poppins text-xl font-semibold leading-9 text-left">
                    {doctor.reviews.length > 0 ? doctor.reviews[0].rating : 'N/A'}
                  </p>
                  <Star className="w-[35.6px] h-[31.72px] text-yellow-400" fill="currentColor" />
                </div>
                <div className="h-[105px] w-[2px] gap-0 border-t border-gray-500 bg-[#959595]"></div>
                <div className="flex flex-col">
                  <p className="text-xl font-semibold leading-9 text-left">
                    {`"${doctor.reviews.length > 0 ? doctor.reviews[0].comment : ''}"`}
                  </p>
                  <div className="flex items-center gap-2">
                    {/*it should be hook*/}
                    {doctor.reviews.map((r, index) => {
                      const date = new Date(r.reviewDate);
                      const months = [
                        'Yanvar',
                        'Fevral',
                        'Mart',
                        'Aprel',
                        'May',
                        'İyun',
                        'İyul',
                        'Avqust',
                        'Sentyabr',
                        'Oktyabr',
                        'Noyabr',
                        'Dekabr',
                      ];
                      const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                        {/*it should be hook*/}
                      return <p key={index}>{formattedDate}</p>;
                    })}

                    <div className="w-[5px] h-[5px] bg-[#D9D9D9] rounded-full mx-[18px] "></div>
                    <p>{doctor.reviews.map(r => r.fullName).join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex my-6 text-sm">
                <button
                  className={`mx-1 py-1 w-[120px] h-[44px] rounded px-2 ${
                    activeTab === 'about' ? 'bg-orange-400 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('about')}
                >
                  Haqqında
                </button>
                <button
                  className={`py-1 w-[120px] h-[44px] rounded px-3 ${
                    activeTab === 'reviews' ? 'bg-orange-400 text-white' : 'bg-gray-200'
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
                <div className="flex flex-col">
                  {doctor.reviews.map((r, index) => (
                    <div key={index} className="flex flex-col gap-[13px]">
                      <Image src={stars} alt="stars" />
                      <p>&quot; {r.comment} &quot;</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <p>{r.fullName}</p>
                        <p>{new Date(r.reviewDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:w-2/5 border w-[460px] h-[694px] p-[45px] border-[#FFB300]">
              <h3 className="font-bold mb-2">Klinikalar</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {doctor.clinics?.map((clinic, index) => (
                  <button
                    key={index}
                    className={`py-2 w-[174px] h-[40px] px-4 rounded ${
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
                  <div className="w-[218px]">
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
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="font-bold">B.e</p>
                      <p className="text-sm">18:00-17:00</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="font-bold">Ç.a</p>
                      <p className="text-sm">18:00-17:00</p>
                    </div>
                    <div className="bg-orange-400 text-white p-2 rounded">
                      <p className="font-bold">Ç</p>
                      <p className="text-sm">19:00-20:00</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="font-bold">C.a</p>
                      <p className="text-sm">18:00-17:00</p>
                    </div>
                    <div className="bg-orange-400 text-white p-2 rounded">
                      <p className="font-bold">C</p>
                      <p className="text-sm">19:00-20:00</p>
                    </div>
                    <div className="bg-orange-400 text-white p-2 rounded">
                      <p className="font-bold">Şənbə</p>
                      <p className="text-sm">19:00-20:00</p>
                    </div>
                    <div className="bg-orange-400 text-white p-2 rounded">
                      <p className="font-bold">Bazar</p>
                      <p className="text-sm">19:00-20:00</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

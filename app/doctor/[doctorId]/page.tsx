'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Star, MapPin, Phone, Mail } from 'lucide-react'
import { Doctors } from '@/components/doctors';

export default function DoctorProfile() {

    const router = useRouter();
    const { doctorId } = router.query; 
  
    const [doctor, setDoctor] = useState<Doctors | null>(null);
  
    useEffect(() => {
      if (doctorId) {
        fetch(`http://64.226.99.16:8090/api/v1/doctor/${doctorId}`)
          .then((res) => res.json())
          .then((data) => setDoctor(data));
      }
    }, [doctorId]);
  
    if (!doctor) {
      return <p>Loading...</p>;
    }

  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about')
  const [activeClinic, setActiveClinic] = useState<'medical-plaza' | 'istanbul'>('medical-plaza')

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md justify-between p-6 flex flex-col md:flex-row gap-6">
          <div className="md:w-2/5">
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={doctor.photoUrl}
                alt="Rəşad Həsənov"
                
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">{doctor.fullName}</h2>
                <p className="text-gray-600">{doctor.speciality}</p>
                <p className="text-sm text-gray-500">
                    {doctor.clinics.map(c=> c.clinicName).join(" / ")}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-2xl font-bold mr-2">4.52</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400" fill={star <= 4 ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm">
                {doctor.serviceDescription}
              </p>
            </div>

            <div className="flex mb-6  text-sm">
              <button
                className={` mx-1 py-1 w-[120px] h-[44px] rounded px-2 ${activeTab === 'about' ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('about')}
              >
                Haqqında
              </button>
              <button
                className={` py-1 w-[120px] h-[44px] rounded px-3 ${activeTab === 'reviews' ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
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
              <div>
                <p>{doctor.reviews.map(r=>r.comments)}</p>
              </div>
            )}
          </div>

          <div className="md:w-2/5">
            <h3 className="font-bold mb-2">Klinikalar</h3>
            <div className="flex flex-col space-y-2 mb-4">
              <button
                className={`py-2 px-4 rounded ${activeClinic === 'medical-plaza' ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveClinic('medical-plaza')}
              >
                Medical Plaza
              </button>
              <button
                className={`py-2 px-4 rounded ${activeClinic === 'istanbul' ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveClinic('istanbul')}
              >
                İstanbul klinikası
              </button>
            </div>

            {activeClinic === 'medical-plaza' && (
              <div>
                <p className="flex items-center mb-2"><MapPin className="w-4 h-4 mr-2" /> Babək pr 92 N</p>
                <p className="flex items-center mb-2"><Phone className="w-4 h-4 mr-2" /> 909</p>
                <p className="flex items-center mb-4"><Mail className="w-4 h-4 mr-2" /> bmpbabek@bmp.az</p>
                
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

            {activeClinic === 'istanbul' && (
              <div>
                <p>İstanbul klinikası məlumatları burada göstəriləcək.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
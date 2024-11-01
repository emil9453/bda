'use client';

import Switch from '@/components/admincomponents/togglebutton';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Clinics {
  clinicId: number;
  clinicName: string;
  location: string;
  contactDetails: string;
  city: string;
  distance: string;
}

interface Doctor {
  doctorId: number;
  fullName: string;
  speciality: string;
  clinics: Clinics[];
  days: string;
  address: string;
  active: boolean;
}

export default function DoctorTable() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

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

  const handleToggle = (id: number) => {
    setDoctors(
      doctors.map(doctor =>
        doctor.doctorId === id ? { ...doctor, active: !doctor.active } : doctor,
      ),
    );
  };

  return (
    <div className="container mx-auto py-10">
      <table className="w-full ">
        <thead>
          <tr className="bg-[rgba(255,179,0,1)]">
            <th className="border-none p-4 text-center">Ad, soyad</th>
            <th className="border-none p-4 text-center">Ixtisas</th>
            <th className="border-none p-4 text-center">Klinika</th>
            <th className="border-none p-4 text-center">Günlər</th>
            <th className="border-none p-4 text-center">Ünvan</th>
            <th className="border-none p-4 text-center">Tənzimləmələr</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.doctorId} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
              <td className="border-none p-2">{doctor.fullName}</td>
              <td className="border-none p-2">{doctor.speciality}</td>
              <td className="border-none p-2">{doctor.clinics.map(c => c.clinicName)}</td>
              <td className="border-none p-2">{doctor.days}</td>
              <td className="border-none p-2">{doctor.clinics.map(c => c.city)}</td>
              <td className="border-none p-2">
                <div className="flex items-center justify-between space-x-2">
                  <button className="text-gray-600 hover:text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                  <Switch
                    isChecked={doctor.active}
                    onChange={() => handleToggle(doctor.doctorId)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

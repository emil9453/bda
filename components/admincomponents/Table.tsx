'use client';

import Switch from '@/components/admincomponents/togglebutton';
import { getAllDoctors } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import TableLoading from './TableLoading';
import { SERVER_URL } from '../constants';
import axios from 'axios';

export default function DoctorTable() {
  const {
    isPending,
    error,
    data: doctors,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: getAllDoctors,
  });

  if (isPending)
    return (
      <div className="mt-5">
        <TableLoading columns={6} rows={8} />
      </div>
    );

  if (error) return 'An error has occurred: ' + error.message;

  const handleToggle = (id: number) => {
    axios.put(`${SERVER_URL}/doctor/${id}/toggle-status`);
    
    
  };

  return (
    <div className="container max-w-full mx-auto py-10">
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
        {isPending && <TableLoading columns={6} rows={8} />}
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.doctorId} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
              <td className="border-none text-center p-2">{doctor.fullName}</td>
              <td className="border-none text-center p-2">{doctor.speciality}</td>
              <td className="border-none text-center p-2">{doctor.clinics.map(c => c.clinicName)}</td>
              <td className="border-none text-center p-2">{doctor.days}</td>
              <td className="border-none text-center p-2 "><div className='w-60 overflow-hidden'>{doctor.clinics.map(c => c.city)}</div></td>
              <td className="border-none text-center p-2">
                <div className="flex items-center justify-between space-x-2">
                  <button className="text-gray-600 hover:text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button onClick={()=>axios.delete(`${SERVER_URL}/doctor/${doctor.doctorId}`) } className="text-gray-600 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                  <Switch
                    isChecked={doctor.isActive == true ? true :false}
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

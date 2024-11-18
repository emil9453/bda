// 'use client';

// import Switch from '@/components/admincomponents/togglebutton';
// import { getAllDoctors } from '@/lib/api';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { Pencil, Trash2 } from 'lucide-react';
// import TableLoading from './TableLoading';
// import { SERVER_URL } from '../constants';
// import axios from 'axios';
// import { Toaster } from 'react-hot-toast';


// export default function DoctorTable() {
//   const queryClient = useQueryClient();

//   const {
//     isPending,
//     error,
//     data: doctors,
//   } = useQuery({
//     queryKey: ['doctors'],
//     queryFn: getAllDoctors,
//   });

//   const toggleMutation = useMutation({
//     mutationFn: (id: number) => axios.put(`${SERVER_URL}/doctor/${id}/toggle-status`),
//     onSuccess: (_, id) => {
//       queryClient.setQueryData(['doctors'], (oldData: any) => {
//         return oldData.map((doctor: any) => 
//           doctor.doctorId === id ? { ...doctor, isActive: !doctor.isActive } : doctor
//         );
//       });
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id: number) => axios.delete(`${SERVER_URL}/doctor/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['doctors'] });
//       window.location.reload();
//     },
//   });

//   if (isPending)
//     return (
//       <div className="mt-5">
//         <TableLoading columns={6} rows={8} />
//       </div>
//     );

//   if (error) return 'An error has occurred: ' + error.message;

//   const handleToggle = (id: number) => {
//     toggleMutation.mutate(id);
//   };

//   const handleDelete = (id: number) => {
//     deleteMutation.mutate(id);
//   };

//   return (
//     <><div className="container max-w-full mx-auto py-10">
//       <table className="w-full ">
//         <thead>
//           <tr className="bg-[rgba(255,179,0,1)]">
//             <th className="border-none p-4 text-center">Ad, soyad</th>
//             <th className="border-none p-4 text-center">Ixtisas</th>
//             <th className="border-none p-4 text-center">Klinika</th>
//             <th className="border-none p-4 text-center">Günlər</th>
//             <th className="border-none p-4 text-center">Ünvan</th>
//             <th className="border-none p-4 text-center">Tənzimləmələr</th>
//           </tr>
//         </thead>
//         {isPending && <TableLoading columns={6} rows={8} />}
//         <tbody>
//           {doctors.map((doctor, index) => (
//             <tr key={doctor.doctorId} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
//               <td className="border-none text-center p-2">{doctor.fullName}</td>
//               <td className="border-none text-center p-2">{doctor.speciality}</td>
//               <td className="border-none text-center p-2">{doctor.clinics.map(c => c.clinicName).join(', ')}</td>
//               <td className="border-none text-center p-2">{doctor.days}</td>
//               <td className="border-none text-center p-2 "><div className='w-60 overflow-hidden'>{doctor.clinics.map(c => c.city).join(', ')}</div></td>
//               <td className="border-none text-center p-2">
//                 <div className="flex items-center justify-between space-x-2">
//                   <button className="text-gray-600 hover:text-blue-600">
//                     <Pencil size={18} />
//                   </button>
//                   <button onClick={() => handleDelete(doctor.doctorId)} className="text-gray-600 hover:text-red-600">
//                     <Trash2 size={18} />
//                   </button>
//                   <Switch
//                     isChecked={doctor.isActive}
//                     onChange={() => handleToggle(doctor.doctorId)} />
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//     <Toaster position='top-center'/>
//     </>
//   );
// }


'use client'

import Switch from '@/components/admincomponents/togglebutton'
import { getAllDoctors } from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'
import TableLoading from './TableLoading'
import { SERVER_URL } from '../constants'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { EditProfile } from '../createprofile/EditProfile'

export default function DoctorTable() {
  const queryClient = useQueryClient()
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)

  const {
    isPending,
    error,
    data: doctors,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: getAllDoctors,
  })

  const toggleMutation = useMutation({
    mutationFn: (id: number) => axios.put(`${SERVER_URL}/doctor/${id}/toggle-status`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['doctors'], (oldData: any) => {
        return oldData.map((doctor: any) => 
          doctor.doctorId === id ? { ...doctor, isActive: !doctor.isActive } : doctor
        )
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`${SERVER_URL}/doctor/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      window.location.reload()
    },
  })

  const handleToggle = (id: number) => {
    toggleMutation.mutate(id)
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleEdit = (id: number) => {
    setSelectedDoctorId(id)
    setIsEditFormOpen(true)
  }

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false)
    setSelectedDoctorId(null)
    queryClient.invalidateQueries({ queryKey: ['doctors'] })
  }

  if (isPending)
    return (
      <div className="mt-5">
        <TableLoading columns={6} rows={8} />
      </div>
    )

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
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
                <td className="border-none text-center p-2">{doctor.clinics.map(c => c.clinicName).join(', ')}</td>
                <td className="border-none text-center p-2">{doctor.days}</td>
                <td className="border-none text-center p-2 "><div className='w-60 overflow-hidden'>{doctor.clinics.map(c => c.city).join(', ')}</div></td>
                <td className="border-none text-center p-2">
                  <div className="flex items-center justify-between space-x-2">
                    <button onClick={() => handleEdit(doctor.doctorId)} className="text-gray-600 hover:text-blue-600">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(doctor.doctorId)} className="text-gray-600 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                    <Switch
                      isChecked={doctor.isActive}
                      onChange={() => handleToggle(doctor.doctorId)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditFormOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsEditFormOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 overflow-scroll h-full w-[600px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isEditFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedDoctorId && (
          <EditProfile doctorId={selectedDoctorId} onClose={handleCloseEditForm} />
        )}
      </div>

      <Toaster position='top-center'/>
    </>
  )
}
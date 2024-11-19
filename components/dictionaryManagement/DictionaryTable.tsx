// 'use client';

// import Switch from '../admincomponents/togglebutton';
// import { Pencil, Trash2 } from 'lucide-react';
// import { Toaster, toast } from 'react-hot-toast';
// import axios from 'axios';
// import { SERVER_URL } from '../constants';
// import { useEffect, useState } from 'react';
// import AddSpeciality from './adddSpeciality';

// interface Speciality {
//   id: number;
//   name: string;
//   isActive: boolean;
// }

// export default function DictionaryTable() {
//   const [specialities, setSpecialities] = useState<Speciality[]>([]);

//   useEffect(() => {
//     const fetchSpecialities = async () => {
//       try {
//         const response = await axios.get(`${SERVER_URL}/specialities/list`);
//         setSpecialities(response.data);
//       } catch (error) {
//         console.error('Specialities fetch failed:', error);
//       }
//     };

//     fetchSpecialities();
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`${SERVER_URL}/specialities/${id}/delete`);
//       setSpecialities((prev) => prev.filter((item) => item.id !== id));
//       toast.success('Silindi');
//     } catch (error) {
//       console.error('Uğursuz Əməliyyat:', error);
//       toast.error('Uğursuz Əməliyyat');
//     }
//   };

//   const handleToggleActive = async (id: number, currentState: boolean) => {
//     try {
//       await axios.put(`${SERVER_URL}/specialities/${id}/toggle-active`, {
//         isActive: !currentState,
//       });

     
//       setSpecialities((prev) =>
//         prev.map((item) =>
//           item.id === id ? { ...item, isActive: !currentState } : item
//         )
//       );

//       toast.success(`Speciality ${!currentState ? 'Aktiv' : 'Passiv'} edildi.`);
//     } catch (error) {
//       console.error('Switch Uğursuz oldu:', error);
//       toast.error('Switch Uğursuz oldu');
//     }
//   };

//   const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
//   const ToggleReviewForm = () => {
//     setIsReviewFormOpen(!isReviewFormOpen);
//   };

//   const HandleClickOutside = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).id === 'overlay') {
//       setIsReviewFormOpen(false);
//     }
//   };

  

//   return (
//     <section className="flex flex-col px-20 mb-4 mt-24 w-full max-md:px-5 max-md:mt-2 max-md:max-w-full">
//       <div className="container max-w-full mx-auto py-10">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-[rgba(255,179,0,1)]">
//               <th className="border-none p-4 text-center">Ad</th>
//               <th className="border-none p-4 text-center">Tənzimləmələr</th>
//             </tr>
//           </thead>
//           <tbody>
//             {specialities.map((item) => (
//               <tr key={item.id}>
//                 <td className="border-none text-center p-2">{item.name}</td>
//                 <td className="border-none text-center p-2">
//                   <div className="flex items-center justify-center space-x-4">
//                     <button onClick={ToggleReviewForm} className="text-gray-600 hover:text-blue-600">
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-red-600"
//                       onClick={() => handleDelete(item.id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                     <Switch
//                       isChecked={item.isActive}
//                       onChange={() => handleToggleActive(item.id, item.isActive)} 
//                     />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//             {/* Overlay */}
//             {isReviewFormOpen && (
//         <div
//           id="overlay"
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={HandleClickOutside}
//         ></div>
//       )}

//       {/* Sliding Review Form */}
//       <div
//         className={`fixed top-0 right-0 overflow-scroll h-full flex items-center p-9 w-[600px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
//           isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <AddSpeciality
          
          
//         /> 
//       </div>
//       <Toaster position="top-center" />
//     </section>
//   );
// }
'use client';

import Switch from '../admincomponents/togglebutton';
import { Pencil, Trash2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URL } from '../constants';
import { useEffect, useState } from 'react';
import EditSpeciality from './editSpecialty';

interface Speciality {
  id: number;
  name: string;
  isActive: boolean;
}

export default function DictionaryTable() {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Speciality | null>(null);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/specialities/list`);
        setSpecialities(response.data);
      } catch (error) {
        console.error('Specialities fetch failed:', error);
      }
    };

    fetchSpecialities();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${SERVER_URL}/specialities/${id}/delete`);
      setSpecialities((prev) => prev.filter((item) => item.id !== id));
      toast.success('Silindi');
    } catch (error) {
      console.error('Uğursuz Əməliyyat:', error);
      toast.error('Uğursuz Əməliyyat');
    }
  };

  const handleToggleActive = async (id: number, currentState: boolean) => {
    try {
      await axios.put(`${SERVER_URL}/specialities/${id}/toggle-active`, {
        isActive: !currentState,
      });

      setSpecialities((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isActive: !currentState } : item
        )
      );

      toast.success(`Speciality ${!currentState ? 'Aktiv' : 'Passiv'} edildi.`);
    } catch (error) {
      console.error('Switch Uğursuz oldu:', error);
      toast.error('Switch Uğursuz oldu');
    }
  };

  const handleOpenForm = (item: Speciality) => {
    setSelectedItem(item);
    setIsReviewFormOpen(true);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'overlay') {
      setIsReviewFormOpen(false);
    }
  };

  return (
    <section className="flex flex-col px-20 mb-4 mt-24 w-full max-md:px-5 max-md:mt-2 max-md:max-w-full">
      <div className="container max-w-full mx-auto py-10">
        <table className="w-full">
          <thead>
            <tr className="bg-[rgba(255,179,0,1)]">
              <th className="border-none p-4 text-center">Ad</th>
              <th className="border-none p-4 text-center">Tənzimləmələr</th>
            </tr>
          </thead>
          <tbody>
            {specialities.map((item) => (
              <tr key={item.id}>
                <td className="border-none text-center p-2">{item.name}</td>
                <td className="border-none text-center p-2">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => handleOpenForm(item)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                    <Switch
                      isChecked={item.isActive}
                      onChange={() => handleToggleActive(item.id, item.isActive)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay */}
      {isReviewFormOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClickOutside}
        ></div>
      )}

      {/* Sliding Form */}
      <div
        className={`fixed top-0 right-0 overflow-scroll h-full flex items-center p-9 w-[600px] hidden-scrollbar bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isReviewFormOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedItem && (
          <EditSpeciality
            initialName={selectedItem.name}
            Id={selectedItem.id} // Prop olarak mevcut ismi gönderiyoruz
          />
        )}
      </div>
      <Toaster position="top-center" />
    </section>
  );
}

// 'use client';
// import { Doctors} from '@/components/doctors';
// import '@/public/customcss/custom.css';
// import locationIcon from '@/public/location/gridicons_location.png';
// import search from '@/public/search/search-normal.png';
// import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import Select from 'react-select';
// import { SERVER_URL } from '../constants';
// import axios from 'axios';


// const SearchBar: React.FC<{
//   defaultDoctorName?: string;
//   defaultSpecialty?: any | null;
//   defaultLocation?: string;
//   defaultClinic?: string;
//   refetch?: () => void;
// }> = ({
//   defaultDoctorName = '',
//   defaultSpecialty = null,
//   defaultLocation = '',
//   defaultClinic = '',
//   refetch = () => {},
// }) => {
//   const [doctorName, setDoctorName] = useState<string>(defaultDoctorName);
//   const [selectedSpecialty, setSelectedSpecialty] = useState<any | null>(defaultSpecialty);
//   const [location, setLocation] = useState<string>(defaultLocation);
//   const [clinic, setClinic] = useState<string>(defaultClinic);
//   const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
//   // const router = useRouter();
//   const [DoctorArray, setDoctorsArray] = useState<Doctors[]>([]);
//   const [Clinics,setClinics1] = useState<any[]>([]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch(`${SERVER_URL}/doctor/all`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const DocArray = await response.json();
//       setDoctorsArray(DocArray);
//       console.log(DocArray);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const fetchedClinics = async () => {
//     try {
//       const response = await fetch('https://64.226.99.16/api/clinics');
//       const fetchedArray = await response.json();
     
//       setClinics1(fetchedArray);
     
//     } catch (error) {
//       console.error("Klinikler yüklenirken bir hata oluştu:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//     fetchedClinics();
//   }, []);

// console.log("😢👇🤓", Clinics); // Dogru qaytardi sonunda 

//   // Google Map Location
//   const inputRef = useRef<google.maps.places.SearchBox | null>(null);
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyCt-YiA9TJ2hNVuVWbytkAcbqEMga-nGLs',
//     libraries: ['places'],
//   });

//   const handleOnPlaceChanged = () => {
//     if (inputRef.current) {
//       const places = inputRef.current.getPlaces();
//       if (places && places.length > 0) {
//         const address = places[0].formatted_address;
//         setLocation(address || '');
//       }
//     }
//   };

//   const handleSearch = async () => {
//     const query = new URLSearchParams({
//       name: doctorName,
//       specialties: selectedSpecialty?.label || '',
//       location: location,
//       clinic: clinic,
//     }).toString();
//     //! This is not working, need to fix
//     // router.push(`/search-results?${query}`);
//     console.log(refetch);
//     // refetch();
//     window.location.replace(`/search-results?${query}`);
//   };

//   const handleSpecialtyChange = (selectedOption: any) => {
//     setSelectedSpecialty(selectedOption);
//   };

//   const handleDoctorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setDoctorName(value);
//     if (value) {
//       const filtered = DoctorArray.filter(doctor =>
//         doctor.fullName.toLowerCase().includes(value.toLowerCase()),
//       );
//       setFilteredDoctors(filtered);
//     } else {
//       setFilteredDoctors([]);
//     }
//   };

//   const handleDoctorSelect = (doctorName: string) => {
//     setDoctorName(doctorName);
//     setFilteredDoctors([]);
//   };

//   const specialtyOptions = DoctorArray.map(doc => ({
//     value: doc.speciality,
//     label: doc.speciality,
//   }));

//   return (
//     <div className="mx-auto w-[1097px] h-[75px]">
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           handleSearch();
//         }}
//         className="flex overflow-visible justify-between mx-auto gap-5 items-center self-stretch height-[74px] pl-8 mt-16 w-full text-xl text-black rounded-lg border border-white shadow-md border-solid max-md:pl-5 max-md:mt-10 max-md:max-w-full"
//       >
//         <input
//           className="focus:outline-none relative"
//           type="search"
//           placeholder="Həkimin adı,Soyadı"
//           value={doctorName}
//           onChange={handleDoctorNameChange}
//         />
//         {/* Hidden because it should be replaced with react-select */}
//         {filteredDoctors.length > 0 && (
//           <ul
//             hidden
//             className="absolute top-[595px] bg-white border border-gray-300 mt-1 w-[200px] z-10 max-h-60 overflow-y-auto"
//           >
//             {filteredDoctors.map(doctor => (
//               <li
//                 key={doctor.doctorId}
//                 onClick={() => handleDoctorSelect(doctor.fullName)}
//                 className="cursor-pointer p-2 hover:bg-gray-200"
//               >
//                 {doctor.fullName}
//               </li>
//             ))}
//           </ul>
//         )}

//         <Select
//           className="max-w-54 our-select before:content-[''] before:absolute before:w-[1px] before:h-full before:bg-[rgba(189,188,179,1)] before:left-0 
//     after:content-[''] after:absolute after:w-[1.5px] after:h-full hidden-scrollbar after:bg-[rgba(189,188,179,1)] after:right-0 after:top-0
//     relative px-4 text-black"
//           styles={{
//             control: provided => ({
//               ...provided,
//               border: 'none',
//               boxShadow: 'none',
//               minWidth: '150px',
//             }),
//             container: provided => ({
//               ...provided,
//               minWidth: '150px',
//               scrollbarWidth: "none"
//             }),
//           }}
//           defaultInputValue={defaultSpecialty}
//           placeholder="İxtisas"
//           options={specialtyOptions}
//           value={selectedSpecialty}
//           onChange={handleSpecialtyChange}
//           formatGroupLabel={data => <div style={{ fontWeight: 'bold' }}>{data.label}</div>}
//           formatOptionLabel={({ label }) => (
//             <div>{label}</div>
//           )}
//         />

//         <div className="relative max-w-54">
//           <input
//             className="relative max-w-32 px-4 focus:outline-none text-black"
//             type="search"
//             placeholder="Klinika"
//             value={clinic}
//             onChange={e => setClinic(e.target.value)}
//           />
//           <span className="absolute right-0 -top-1.5 w-[1px] h-[40px] bg-[rgba(189,188,179,1)]"></span>
//         </div>

//         {isLoaded && (
//           <>
//             <Image src={locationIcon} alt="location" />
//             <StandaloneSearchBox
//               onLoad={ref => (inputRef.current = ref)}
//               onPlacesChanged={handleOnPlaceChanged}
//             >
//               <input className="max-w-56 focus:outline-none" type="text" placeholder="Məkan" />
//             </StandaloneSearchBox>
//           </>
//         )}

//         <button type="submit" className="px-4 py-4 flex rounded-lg bg-orange-500">
//           <Image src={search} alt="search" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;

'use client';

import { Doctors } from '@/components/doctors';
import '@/public/customcss/custom.css';
import locationIcon from '@/public/location/gridicons_location.png';
import search from '@/public/search/search-normal.png';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { SERVER_URL } from '../constants';

export default function SearchBar({
  defaultDoctorName = '',
  defaultSpecialty = null,
  defaultLocation = '',
  defaultClinic = '',
  refetch = () => {},
}: {
  defaultDoctorName?: string;
  defaultSpecialty?: any | null;
  defaultLocation?: string;
  defaultClinic?: string;
  refetch?: () => void;
}) {
  const [doctorName, setDoctorName] = useState<string>(defaultDoctorName);
  const [selectedSpecialty, setSelectedSpecialty] = useState<any | null>(defaultSpecialty);
  const [location, setLocation] = useState<string>(defaultLocation);
  const [clinics, setClinics] = useState<{ list: any[]; selected: any | null }>({ list: [], selected: null });
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
  const [DoctorArray, setDoctorsArray] = useState<Doctors[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/doctor/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const DocArray = await response.json();
      setDoctorsArray(DocArray);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchedClinics = async () => {
    try {
      const response = await fetch('https://64.226.99.16/api/clinics');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedArray = await response.json();
      setClinics(prevState => ({ ...prevState, list: fetchedArray }));
    } catch (error) {
      console.error("Error fetching clinics", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchedClinics();
  }, []);

  // Google Map Location
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCt-YiA9TJ2hNVuVWbytkAcbqEMga-nGLs',
    libraries: ['places'],
  });

  const handleOnPlaceChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places && places.length > 0) {
        const address = places[0].formatted_address;
        setLocation(address || '');
      }
    }
  };

  const handleSearch = async () => {
    const query = new URLSearchParams({
      name: doctorName,
      specialties: selectedSpecialty?.label || '',
      location: location,
      clinic: clinics.selected?.label || '',
    }).toString();
    console.log(refetch)
    window.location.replace(`/search-results?${query}`);
  };

  const handleSpecialtyChange = (selectedOption: any) => {
    setSelectedSpecialty(selectedOption);
  };

  const handleClinicChange = (selectedOption: any) => {
    setClinics(prevState => ({ ...prevState, selected: selectedOption }));
  };

  const handleDoctorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDoctorName(value);
    if (value) {
      const filtered = DoctorArray.filter(doctor =>
        doctor.fullName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  };

  const handleDoctorSelect = (doctorName: string) => {
    setDoctorName(doctorName);
    setFilteredDoctors([]);
  };

  const specialtyOptions = DoctorArray.map(doc => ({
    value: doc.speciality,
    label: doc.speciality,
  }));

  const clinicOptions = clinics.list.map(clinic => ({
    value: clinic.clinicId,
    label: clinic.clinicName,
  }));

  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      minWidth: '150px',
    }),
    container: (provided: any) => ({
      ...provided,
      minWidth: '150px',
      scrollbarWidth: "none"
    }),
  };

  return (
    <div className="mx-auto w-[1097px] h-[75px]">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex overflow-visible justify-between mx-auto gap-5 items-center self-stretch height-[74px] pl-8 mt-16 w-full text-xl text-black rounded-lg border border-white shadow-md border-solid max-md:pl-5 max-md:mt-10 max-md:max-w-full"
      >
        <input
          className="focus:outline-none relative"
          type="search"
          placeholder="Həkimin adı,Soyadı"
          value={doctorName}
          onChange={handleDoctorNameChange}
        />
        {/* Hidden because it should be replaced with react-select */}
        {filteredDoctors.length > 0 && (
          
          <ul
            hidden
            className="absolute top-[595px] bg-white border border-gray-300 mt-1 w-[200px] z-10 max-h-60 overflow-y-auto"
          >
            {filteredDoctors.map(doctor => (
              <li
                key={doctor.doctorId}
                onClick={() => handleDoctorSelect(doctor.fullName)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {doctor.fullName}
              </li>
            ))}
          </ul>
        )}

        <Select
          className="max-w-54 our-select before:content-[''] before:absolute before:w-[1px] before:h-full before:bg-[rgba(189,188,179,1)] before:left-0 
    after:content-[''] after:absolute after:w-[1.5px] after:h-full hidden-scrollbar after:bg-[rgba(189,188,179,1)] after:right-0 after:top-0
    relative px-4 text-black"
          styles={selectStyles}
          defaultInputValue={defaultSpecialty}
          placeholder="İxtisas"
          options={specialtyOptions}
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
          formatGroupLabel={data => <div style={{ fontWeight: 'bold' }}>{data.label}</div>}
          formatOptionLabel={({ label }) => (
            <div>{label}</div>
          )}
        />

        <Select
          className="max-w-54 our-select before:content-[''] before:absolute before:w-[1px] before:h-full before:bg-[rgba(189,188,179,1)] before:left-0 
    after:content-[''] after:absolute after:w-[1.5px] after:h-full hidden-scrollbar after:bg-[rgba(189,188,179,1)] after:right-0 after:top-0
    relative px-4 text-black"
          styles={selectStyles}
          defaultInputValue={defaultClinic}
          placeholder="Klinika"
          options={clinicOptions}
          value={clinics.selected}
          onChange={handleClinicChange}
          formatGroupLabel={data => <div style={{ fontWeight: 'bold' }}>{data.label}</div>}
          formatOptionLabel={({ label }) => (
            <div>{label}</div>
          )}
        />

        {isLoaded && (
          <>
            <Image src={locationIcon} alt="location" />
            <StandaloneSearchBox
              onLoad={ref => (inputRef.current = ref)}
              onPlacesChanged={handleOnPlaceChanged}
            >
              <input className="max-w-56 focus:outline-none" type="text" placeholder="Məkan" />
            </StandaloneSearchBox>
          </>
        )}

        <button type="submit" className="px-4 py-4 flex rounded-lg bg-orange-500">
          <Image src={search} alt="search" />
        </button>
      </form>
    </div>
  );
}
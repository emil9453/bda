'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import DoctorsArray, { Doctors } from '@/components/doctors';
import Select from 'react-select';
import search from '@/public/search/search-normal.png';
import locationIcon from '@/public/location/gridicons_location.png';
import '@/public/customcss/custom.css';

const specialtyOptions = [
  {
    value: 'Pediatr',
    label: 'Pediatr',
    subcategories: [
      { value: 'Cardiologist', label: 'Cardiologist' },
      { value: 'Dermatologist', label: 'Dermatologist' },
    ],
  },
  {
    value: 'Uşaq endokrinoloqu',
    label: 'Uşaq endokrinoloqu',
    subcategories: [
      { value: 'Neurologist', label: 'Neurologist' },
      { value: 'Orthopedic Surgeon', label: 'Orthopedic Surgeon' },
    ],
  },
  {
    value: 'Mama-ginekoloq',
    label: 'Mama-ginekoloq',
    subcategories: [
      { value: 'Radiologist', label: 'Radiologist' },
      { value: 'Pathologist', label: 'Pathologist' },
    ],
  },
  {
    value: 'Həkim-ginekoloq',
    label: 'Həkim-ginekoloq',
    subcategories: [
      { value: 'Gynecologist', label: 'Gynecologist' },
      { value: 'Obstetrician', label: 'Obstetrician' },
    ],
  },
  {
    value: 'Ginekoloq',
    label: 'Ginekoloq',
    subcategories: [
      { value: 'Gynecologist', label: 'Gynecologist' },
      { value: 'Obstetrician', label: 'Obstetrician' },
    ],
  },
];

const SearchBar: React.FC = () => {
  const [doctorName, setDoctorName] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<any | null>(null);
  const [currentOptions, setCurrentOptions] = useState(specialtyOptions);
  const [location, setLocation] = useState<string>('');
  const [clinic, setClinic] = useState<string>('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]); // Filtrelenmiş doktorları saklamak için durum

  const router = useRouter();

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

  const handleSearch = () => {
    const query = new URLSearchParams({
      name: doctorName,
      specialties: selectedSpecialty?.value || '',
      location,
      clinic: clinic,
    }).toString();
    router.push(`/search-results?${query}`);
  };

  const handleSpecialtyChange = (selectedOption: any) => {
    setSelectedSpecialty(selectedOption);
    if (selectedOption?.subcategories) {
      setCurrentOptions(selectedOption.subcategories);
    }
  };

  const handleDoctorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDoctorName(value);
    if (value) {
      const filtered = DoctorsArray.filter(doctor =>
        doctor.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredDoctors(filtered); // Filtrelenmiş doktorları güncelle
    } else {
      setFilteredDoctors([]); // Eğer input boşsa listeyi temizle
    }
  };

  const handleDoctorSelect = (doctorName: string) => {
    setDoctorName(doctorName); // Seçilen doktor adını input alanına yerleştir
    setFilteredDoctors([]); // Listeyi temizle
  };

  return (
    <div className="mx-auto w-[1097px]">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex overflow-visible justify-between mx-auto gap-5 items-center self-stretch height-[74px] pl-8 mt-16 w-full text-xl text-black rounded-lg border border-black border-solid max-md:pl-5 max-md:mt-10 max-md:max-w-full"
      >
        <input
          className="w-[232px] focus:outline-none relative"
          type="search"
          placeholder="Doctor name, Surname"
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
                key={doctor.id}
                onClick={() => handleDoctorSelect(doctor.name)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        )}

        <Select
          className="max-w-54 our-select before:content-[''] before:absolute before:w-[2px] before:h-full before:bg-gray-400 before:left-0 
               after:content-[''] after:absolute after:w-[2px] after:h-full after:bg-gray-400 after:right-0 after:top-0
               relative px-4 text-black"
          styles={{
            control: provided => ({
              ...provided,
              border: 'none',
              boxShadow: 'none',
            }),
          }}
          placeholder="Specialty"
          options={currentOptions}
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
        />

        <div className="relative max-w-54">
          <input
            className="relative w-full px-4 focus:outline-none text-black"
            type="search"
            placeholder="Clinic"
            value={clinic}
            onChange={e => setClinic(e.target.value)}
          />
          <span className="absolute right-0 -top-1.5 w-[2px] h-[40px] bg-gray-400"></span>
        </div>

        {isLoaded && (
          <>
            <Image src={locationIcon} alt="location" />
            <StandaloneSearchBox
              onLoad={ref => (inputRef.current = ref)}
              onPlacesChanged={handleOnPlaceChanged}
            >
              <input className="max-w-56 focus:outline-none" type="text" placeholder="Location" />
            </StandaloneSearchBox>
          </>
        )}

        <button type="submit" className="px-4 py-4 flex rounded-lg bg-orange-500">
          <Image src={search} alt="search" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

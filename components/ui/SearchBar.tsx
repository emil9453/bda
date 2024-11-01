'use client';
import { Doctors } from '@/components/doctors';
import '@/public/customcss/custom.css';
import locationIcon from '@/public/location/gridicons_location.png';
import search from '@/public/search/search-normal.png';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { SERVER_URL } from '../constants';
const specialtyOptions = [
  {
    value: '1',
    label: 'Pediatr',
  },
  {
    value: '2',
    label: 'Uşaq endokrinoloqu',
    parent: '1',
  },
  {
    value: '3',
    label: 'Neotolog',
    parent: '1',
  },
  {
    value: '4',
    label: 'Ginekoloq',
  },
  {
    value: '5',
    label: 'Həkim-ginekoloq',
    parent: '4',
  },
  {
    value: '6',
    label: 'Mama-ginekoloq',
    parent: '4',
  },
];

const SearchBar: React.FC = () => {
  const [doctorName, setDoctorName] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<any | null>(null);
  const [location, setLocation] = useState<string>('');
  const [clinic, setClinic] = useState<string>('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
  const router = useRouter();
  const [DoctorArray, setDoctorsArray] = useState<Doctors[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/doctor/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const DocArray = await response.json();
      setDoctorsArray(DocArray);
      console.log(DocArray);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
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

  const handleSearch = () => {
    const query = new URLSearchParams({
      name: doctorName,
      specialties: selectedSpecialty?.label || '',
      location: location,
      clinic: clinic,
    }).toString();
    router.push(`/search-results?${query}`);
  };

  const handleSpecialtyChange = (selectedOption: any) => {
    setSelectedSpecialty(selectedOption);
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

  return (
    <div className="mx-auto w-[1097px]">
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
    after:content-[''] after:absolute after:w-[1.5px] after:h-full after:bg-[rgba(189,188,179,1)] after:right-0 after:top-0
    relative px-4 text-black"
          styles={{
            control: provided => ({
              ...provided,
              border: 'none',
              boxShadow: 'none',
              minWidth: '150px',
            }),
            container: provided => ({
              ...provided,
              minWidth: '150px',
            }),
          }}
          placeholder="İxtisas"
          options={specialtyOptions}
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
          formatGroupLabel={data => <div style={{ fontWeight: 'bold' }}>{data.label}</div>}
          formatOptionLabel={({ label, parent }) => (
            <div style={{ paddingLeft: parent ? '20px' : '0' }}>{label}</div>
          )}
        />

        <div className="relative max-w-54">
          <input
            className="relative max-w-32 px-4 focus:outline-none text-black"
            type="search"
            placeholder="Klinika"
            value={clinic}
            onChange={e => setClinic(e.target.value)}
          />
          <span className="absolute right-0 -top-1.5 w-[1px] h-[40px] bg-[rgba(189,188,179,1)]"></span>
        </div>

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
};

export default SearchBar;

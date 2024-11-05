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

const SearchBar: React.FC<{
  defaultDoctorName?: string;
  defaultSpecialty?: any | null;
  defaultLocation?: string;
  defaultClinic?: string;
  refetch?: () => void;
  rating?: string | null;
  review?: string | null;
  onSearch?: (query: string) => void;
}> = ({
  defaultDoctorName = '',
  defaultSpecialty = null,
  defaultLocation = '',
  defaultClinic = '',
  refetch = () => {},
  rating = '',
  review = '',
  onSearch,
}) => {
  const [doctorName, setDoctorName] = useState<string>(defaultDoctorName);
  const [selectedSpecialty, setSelectedSpecialty] = useState<any | null>(defaultSpecialty);
  const [location, setLocation] = useState<string>(defaultLocation);
  const [clinics, setClinics] = useState<{ list: any[]; selected: any | null }>({
    list: [],
    selected: null,
  });
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
      console.error('Error fetching clinics', error);
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
    const query = new URLSearchParams();
    query.set('name', doctorName);
    query.set('specialties', selectedSpecialty?.value || '');
    query.set('location', location);
    query.set('clinic', clinics.selected?.label || '');
    query.set('rating', rating ?? '');
    query.set('review', review ?? '');

    window.history.pushState({}, '', `?${query.toString()}`);
    if(onSearch) {
      onSearch(query.toString());
      return;
    }
    refetch();
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
    indicatorSeparator: () => ({
      display: 'none',
    }),
    container: (provided: any) => ({
      ...provided,
      minWidth: '150px',
      scrollbarWidth: 'none',
    }),
  };

  return (
    <div className="mx-auto  h-[75px]">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex overflow-visible mx-auto gap-5 items-center self-stretch height-[74px] pl-8 mt-16 w-full text-xl text-black rounded-lg border border-white shadow-md border-solid max-md:pl-5 max-md:mt-10 max-md:max-w-full"
      >
        <input
          className="focus:outline-none relative flex-1"
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
          className="max-w-54 our-select flex-1 before:content-[''] before:absolute before:w-[1px] before:h-full before:bg-[rgba(189,188,179,1)] before:left-0 
    after:content-[''] after:absolute after:w-[1.5px] after:h-full hidden-scrollbar after:bg-[rgba(189,188,179,1)] after:right-0 after:top-0
    relative px-4 text-black"
          styles={selectStyles}
          isClearable
          defaultInputValue={defaultSpecialty}
          placeholder="İxtisas"
          options={specialtyOptions}
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
          formatGroupLabel={data => <div style={{ fontWeight: 'bold' }}>{data.label}</div>}
          formatOptionLabel={({ label }) => <div>{label}</div>}
        />

        <Select
          className="max-w-54 our-select  before:h-full before:bg-[rgba(189,188,179,1)] before:left-0 
    after:content-[''] after:absolute after:w-[1.5px] after:h-full hidden-scrollbar after:bg-[rgba(189,188,179,1)] after:right-0 after:top-0
    relative px-4 text-black"
          styles={selectStyles}
          defaultInputValue={defaultClinic}
          placeholder="Klinika"
          isClearable
          options={clinicOptions}
          value={clinics.selected}
          onChange={handleClinicChange}
          formatGroupLabel={data => <div style={{ fontWeight: 'bold' }}>{data.label}</div>}
          formatOptionLabel={({ label }) => <div>{label}</div>}
        />

        <div className="flex flex-1">
          <Image src={locationIcon} className="mr-2" alt="location" />
          {isLoaded && (
            <>
              <StandaloneSearchBox
                onLoad={ref => (inputRef.current = ref)}
                onPlacesChanged={handleOnPlaceChanged}
              >
                <input
                  className="max-w-56 focus:outline-none flex-1"
                  type="text"
                  placeholder="Məkan"
                />
              </StandaloneSearchBox>
            </>
          )}
          {!isLoaded && (
            <input className="max-w-56 focus:outline-none flex-1" type="text" placeholder="Məkan" />
          )}
        </div>

        <button type="submit" className="px-4 py-4 flex rounded-lg bg-orange-500">
          <Image src={search} alt="search" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

'use client';

import { Doctors } from '@/components/doctors';
import '@/public/customcss/custom.css';
import locationIcon from '@/public/location/gridicons_location.png';
import search from '@/public/search/search-normal.png';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image';
import { useEffect, useRef, useState, useMemo } from 'react';
import Select from 'react-select';
import { DOCTOR_URL, SERVER_URL } from '../constants';
import axios from 'axios';

interface ClinicOption {
  value: any;
  label: any;
}

const SearchBar: React.FC<{
  defaultDoctorName?: string;
  defaultSpecialty?: string | null;
  defaultLocation?: string;
  defaultClinic?: string;
  refetch?: () => void;
  rating?: string | null;
  review?: string | null;
  onSearch?: (query: string) => void;
  onDoctorsFetch?: (doctors: Doctors[]) => void;
}> = ({
  defaultDoctorName = '',
  defaultLocation = '',
  refetch = () => {},
  defaultClinic,
  defaultSpecialty,
  rating = '',
  review = '',
  onSearch,
  onDoctorsFetch,
}) => {
  const defaultSelectedSpecialty = useMemo(
    () => (defaultSpecialty ? { value: defaultSpecialty, label: defaultSpecialty } : null),
    [defaultSpecialty],
  );

  const defaultSelectedClinic = defaultClinic
    ? { value: defaultClinic, label: defaultClinic }
    : null;

  const [doctorName, setDoctorName] = useState<string>(defaultDoctorName);
  const [selectedSpecialty, setSelectedSpecialty] = useState<ClinicOption | null>(
    defaultSelectedSpecialty,
  );
  const [location, setLocation] = useState<string>(defaultLocation);
  const [clinicOptions, setClinicOptions] = useState<ClinicOption[]>(
    defaultSelectedClinic ? [defaultSelectedClinic] : [],
  );
  const [selectedClinic, setSelectedClinic] = useState<ClinicOption | null>(defaultSelectedClinic);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
  const [doctorArray, setDoctorArray] = useState<Doctors[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/doctor/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const docArray = await response.json();
      if (onDoctorsFetch) {
        onDoctorsFetch(docArray);
      }
      setDoctorArray(docArray);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchClinics = async () => {
    try {
      const response = await axios.get(`${DOCTOR_URL}`);
      const clinics = response.data.flatMap((d: any) => d.clinics?.map((c: any) => c.clinicName));
      const uniqueClinics = [...new Set(clinics)];
      const clinicOptions = uniqueClinics?.map(clinicName => ({
        value: clinicName,
        label: clinicName,
      }));

      setClinicOptions(clinicOptions);
    } catch (error) {
      console.error('Error fetching clinics', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchClinics();
  }, []);

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
    query.set('clinic', selectedClinic?.value || '');
    query.set('rating', rating ?? '');
    query.set('review', review ?? '');

    window.history.pushState({}, '', `?${query.toString()}`);
    if (onSearch) {
      onSearch(query.toString());
      return;
    }
    refetch();
  };

  const handleSpecialtyChange = (selectedOption: ClinicOption | null) => {
    setSelectedSpecialty(selectedOption);
  };

  const handleClinicChange = (selectedOption: ClinicOption | null) => {
    setSelectedClinic(selectedOption);
  };

  const handleDoctorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDoctorName(value);
    if (value) {
      const filtered = doctorArray.filter(doctor =>
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

  const specialtyOptions = useMemo(() => {
    if (doctorArray.length === 0 && defaultSelectedSpecialty) return [defaultSelectedSpecialty];
    const uniqueSpecialties = Array.from(new Set(doctorArray.map(doc => doc.speciality)));
    return uniqueSpecialties.map(specialty => ({
      value: specialty,
      label: specialty,
    }));
  }, [doctorArray, defaultSelectedSpecialty]);

  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      minWidth: '100%',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    container: (provided: any) => ({
      ...provided,
      minWidth: '100%',
      scrollbarWidth: 'none',
    }),
  };

  return (
    <div className="w-full max-w-7xl sm:py-3 py-4 mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex flex-col overflow-visible mx-auto self-stretch sm:height-[74px] pl-4 border-solid max-md:pl-5 max-md:mt-10 max-md:max-w-full sm:flex-row sm:justify-between items-center gap-4 sm:gap-2 min-h-16 mt-8 w-full text-base sm:text-lg text-black rounded-lg border border-white shadow-md"
      >
        <div className="w-full sm:w-1/5 relative">
          <input
            className="w-full p-2 focus:outline-none border-b sm:border-b-0 sm:border-r border-gray-200"
            type="search"
            placeholder="Həkimin adı,Soyadı"
            value={doctorName}
            onChange={handleDoctorNameChange}
          />
          {filteredDoctors.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
              {filteredDoctors.map(doctor => (
                <li
                  key={doctor.doctorId}
                  onClick={() => handleDoctorSelect(doctor.fullName)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {doctor.fullName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full sm:w-1/5">
          <Select
            className="w-full"
            styles={selectStyles}
            isClearable
            placeholder="İxtisas"
            options={specialtyOptions}
            value={selectedSpecialty}
            onChange={handleSpecialtyChange}
            formatGroupLabel={data => <div className="font-bold">{data.label}</div>}
            formatOptionLabel={({ label }) => <div>{label}</div>}
          />
        </div>

        <div className="w-full sm:w-1/5">
          <Select
            className="w-full"
            styles={selectStyles}
            placeholder="Klinika"
            isClearable
            options={clinicOptions}
            value={selectedClinic}
            onChange={handleClinicChange}
            formatGroupLabel={data => <div className="font-bold">{data.label}</div>}
            formatOptionLabel={({ label }) => <div>{label}</div>}
          />
        </div>

        <div className="w-full sm:w-1/5 flex items-center">
          <Image src={locationIcon} className="mr-2" alt="location" width={24} height={24} />
          {isLoaded ? (
            <StandaloneSearchBox
              onLoad={ref => (inputRef.current = ref)}
              onPlacesChanged={handleOnPlaceChanged}
            >
              <input
                className="w-full p-2 focus:outline-none"
                type="text"
                placeholder="Məkan"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </StandaloneSearchBox>
          ) : (
            <input
              className="w-full p-2 focus:outline-none"
              type="text"
              placeholder="Məkan"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full sm:h-[54px] sm:w-auto px-4 py-2 mt-4 sm:mt-0 flex items-center justify-center rounded-lg bg-orange-500 text-white"
        >
          <Image src={search} alt="search" className="h-full" />
          <span className="sm:hidden">Axtar</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

'use client';

import { Doctors } from '@/components/doctors';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';

export function useFilteredDoctors() {
  const searchParams = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);

  const fetchDoctors = async () => {
    const name = searchParams.get('name') || '';
    const specialties = searchParams.get('specialties') || '';
    const location = searchParams.get('location') || '';
    const clinic = searchParams.get('clinic') || '';

    console.log("Search parameters:", { name, specialties, location, clinic });

    try {
      const response = await axios.post(`${SERVER_URL}/doctor/specification`, {
        fullName: name,
        speciality: specialties,
        clinicName: clinic,
        location: location,
        reviewCount: 0,
        ratingCount: 0,
        sortBy: ""
      });
      
      const data = response.data;
      setFilteredDoctors(data);
      console.log("Filtered doctors:", data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [searchParams]);

  return filteredDoctors;
}
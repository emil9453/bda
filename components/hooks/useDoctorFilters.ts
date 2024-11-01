'use client';

import { useSearchParams } from 'next/navigation';
import { getDoctorSpecs } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function useFilteredDoctors() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name') || '';
  const specialties = searchParams.get('specialties') || '';
  const location = searchParams.get('location') || '';
  const clinic = searchParams.get('clinic') || '';

  const {
    isLoading,
    isRefetching,
    error,
    data: filteredDoctors,
    refetch,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: () =>
      getDoctorSpecs({
        fullName: name,
        speciality: specialties,
        location,
        clinicName: clinic,
      }),
  });

  return {
    filteredDoctors,
    name,
    specialties,
    location,
    clinic,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
}

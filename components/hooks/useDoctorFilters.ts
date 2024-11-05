'use client';

import { useSearchParams } from 'next/navigation';
import { getDoctorSpecs as getDoctorSpecsApiCall } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { CloseHandler } from '../filter-buttons';
import { useEffect } from 'react';

export function useFilteredDoctors() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name') || '';
  const specialties = searchParams.get('specialties') || '';
  const location = searchParams.get('location') || '';
  const clinic = searchParams.get('clinic') || '';
  const rating = searchParams.get('rating') || null;
  const review = searchParams.get('review') || null;

  const getParams = () => ({
    fullName: name,
    speciality: specialties,
    location,
    clinicName: clinic,
    ratingCount: rating,
    reviewCount: review,
  });

  const {
    mutate: getDoctorSpecs,
    error,
    isPending: isLoading,
    data: filteredDoctors,
  } = useMutation({
    mutationFn: () => getDoctorSpecsApiCall(getParams()),
  });

  useEffect(() => {
    getDoctorSpecs();
  }, []);

  const handleCloseFilter: CloseHandler = ({ review, rating }) => {
    const url = new URL(window.location.href);
    url.searchParams.set('rating', rating ? rating.toString() : '');
    url.searchParams.set('review', review ? review.toString() : '');
    window.history.pushState({}, '', url.toString());
    getDoctorSpecs();
  };

  return {
    filteredDoctors,
    handleCloseFilter,
    rating,
    review,
    name,
    specialties,
    location,
    clinic,
    isLoading,
    error,
    refetch: getDoctorSpecs,
    isRefetching: isLoading,
  };
}

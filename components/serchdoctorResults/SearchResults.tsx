'use client';

import { useFilteredDoctors } from '@/components/hooks/useDoctorFilters';
import DoctorList from '@/components/serchdoctorResults/DoctorList';
import SearchBar from '@/components/ui/SearchBar';
import { NoDoctorsFound } from '../no-doctors-found';
import FilterForCount from '../ui/FilterForCount';

export default function SearchResults() {
  const filteredDoctors = useFilteredDoctors();

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />

      <FilterForCount/>

      {filteredDoctors.length > 0 ? <DoctorList doctors={filteredDoctors} /> : <NoDoctorsFound />}
    </div>
  );
}

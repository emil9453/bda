'use client';
import { useFilteredDoctors } from '@/components/hooks/useDoctorFilters';
import DoctorList from '@/components/serchdoctorResults/DoctorList';
import SearchBar from '@/components/ui/SearchBar';
import { NoDoctorsFound } from '../no-doctors-found';
import { LoadingDoctors } from '../LoadingDoctors';
// import FilterForCount from '../ui/FilterForCount';

export default function SearchResults() {
  const {
    isLoading,
    error,
    filteredDoctors = [],
    name: defaultDoctorName,
    specialties: defaultSpecialty,
    location: defaultLocation,
    clinic: defaultClinic,
    isRefetching,
    refetch,
  } = useFilteredDoctors();

  const shouldShowLoading = isLoading || isRefetching;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar
        defaultClinic={defaultClinic}
        defaultDoctorName={defaultDoctorName}
        defaultLocation={defaultLocation}
        defaultSpecialty={defaultSpecialty}
        refetch={refetch}
      />

      {/* <FilterForCount/> */}

      {shouldShowLoading && <LoadingDoctors />}

      {!shouldShowLoading &&
        (filteredDoctors?.length > 0 ? (
          <DoctorList doctors={filteredDoctors} />
        ) : (
          <NoDoctorsFound />
        ))}
    </div>
  );
}

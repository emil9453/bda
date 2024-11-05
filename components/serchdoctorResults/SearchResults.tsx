'use client';
import { useFilteredDoctors } from '@/components/hooks/useDoctorFilters';
import DoctorList from '@/components/serchdoctorResults/DoctorList';
import SearchBar from '@/components/ui/SearchBar';
import { NoDoctorsFound } from '../no-doctors-found';
import { LoadingDoctors } from '../LoadingDoctors';
import { FilterButtons } from '../filter-buttons';
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
    review: defaultReview,
    rating: defaultRating,
    refetch,
    handleCloseFilter,
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
        rating={defaultRating}
        review={defaultReview}
      />

      <div className="flex justify-between">
        {
          <h2 className="self-start mt-12 ml-5 text-3xl font-semibold text-zinc-950 max-md:mt-10 max-md:ml-2.5">
            {filteredDoctors.length > 0 ? filteredDoctors.length + ' Nəticə Tapıldı' : ''}
          </h2>
        }
        <div className="flex mt-5 max-md:mt-10">
          <FilterButtons defaultReview={defaultReview} defaultRating={defaultRating} onClose={handleCloseFilter} />
        </div>
      </div>

      {shouldShowLoading && <LoadingDoctors />}

      {!shouldShowLoading &&
        (filteredDoctors?.length > 0 ? (
          <DoctorList  doctors={filteredDoctors} />
        ) : (
          <NoDoctorsFound />
        ))}
    </div>
  );
}

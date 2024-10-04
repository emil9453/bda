'use client'

import { useFilteredDoctors } from '@/components/hooks/useDoctorFilters'
import DoctorList from '@/components/serchdoctorResults/DoctorList'
import SearchBar from '@/components/ui/SearchBar'

export default function SearchResults() {
  const filteredDoctors = useFilteredDoctors()

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      {filteredDoctors.length > 0 ? (
        <DoctorList doctors={filteredDoctors} />
      ) : (
        <p className="text-xl text-gray-600">No doctors found matching your criteria.</p>
      )}
    </div>
  )
}
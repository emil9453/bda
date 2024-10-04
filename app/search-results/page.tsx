"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DoctorsArray, {Doctors} from '@/components/doctors' 
import DoctorCard from '@/components/ui/doctorCard'
import SearchBar from '@/components/ui/SearchBar'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([])

  useEffect(() => {
    const name = searchParams.get('name')?.toLowerCase() || ""
    const specialties = searchParams.get('specialties')?.toLowerCase().split(',') || []
    const location = searchParams.get('location')?.toLowerCase() || ""
    const clinic = searchParams.get('clinic')?.toLowerCase() || ""
    const filtered = DoctorsArray.filter((doctor) => {
      const matchesName = name ? doctor.name.toLowerCase().includes(name) : true
      const matchesSpecialty = specialties.length > 0 && specialties[0] !== "" 
        ? specialties.includes(doctor.specialty.toLowerCase()) 
        : true
      const matchesLocation = location ? doctor.location.toLowerCase().includes(location) : true
      const matchesClinic = clinic ? doctor.clinic.toLocaleLowerCase().includes(clinic) : true
      return matchesName && matchesSpecialty && matchesLocation && matchesClinic
    })

    setFilteredDoctors(filtered)
  }, [searchParams])

  return (
    <>
     <header className="overflow-hidden font-kyiv px-4 py-3.5 w-full text-4xl font-bold whitespace-nowrap bg-amber-500 text-stone-50 max-md:pr-5 max-md:max-w-full">
          Topdoc
        </header>
    <div className="container mx-auto px-4 py-8">
     
     <SearchBar/>
      
      {filteredDoctors.length > 0 ? (
        <div className="flex overflow-hidden flex-col pb-60 bg-white max-md:pb-24">
       
        <main className="flex flex-col px-20 mt-12 w-full text-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
          
          <h2 className="self-start mt-12 ml-24 text-3xl font-semibold text-zinc-950 max-md:mt-10 max-md:ml-2.5">
            {filteredDoctors.length} Provides
          </h2>
          {filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </main>
      </div>
      ) : (
        <p className="text-xl text-gray-600">No doctors found matching your criteria.</p>
      )}
    </div>
    </>
  )
}
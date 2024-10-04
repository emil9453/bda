import { Doctors } from '@/components/doctors'
import DoctorCard from '@/components/ui/doctorCard'

interface DoctorListProps {
  doctors: Doctors[]
}

export default function DoctorList({ doctors }: DoctorListProps) {
  return (
    <div className="flex overflow-hidden flex-col pb-60 bg-white max-md:pb-24">
      <main className="flex flex-col px-20 mt-12 w-full text-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="self-start mt-12 ml-24 text-3xl font-semibold text-zinc-950 max-md:mt-10 max-md:ml-2.5">
          {doctors.length} Providers
        </h2>
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </main>
    </div>
  )
}
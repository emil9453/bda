import { Doctors } from '@/components/doctors';
import DoctorCard from '@/components/ui/doctorCard';

interface DoctorListProps {
  doctors: Doctors[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  return (
    <div className=" overflow-hidden pb-60 bg-white max-md:pb-24">
      <main className="flex  mt-5 w-full text-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex-1 pl-5">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>

        <div className="flex-1">
          <video autoPlay loop muted playsInline>
            <source src="/doctor-search.webm" type="video/mp4" />
          </video>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link"
import DoctorProfile from "@/components/ui/doctor-profile"

export default function DoctorPage(){
  return(
    <>
   <header className="overflow-hidden font-kyiv px-4 py-3.5 w-full text-4xl font-bold whitespace-nowrap bg-amber-500 text-stone-50 max-md:pr-5 max-md:max-w-full">
        <Link href={'/'}>Topdoc</Link>
    </header>

    <DoctorProfile/>
    </>
  )
}
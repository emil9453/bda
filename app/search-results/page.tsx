import SearchResults from '@/components/serchdoctorResults/SearchResults';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function DoctorSearchPage() {
  // const response = await fetch('http://64.226.99.16:8090/api/v1/doctor/all');
  // const DocArray = await response.json();
  // console.log(DocArray,'DocArray')
  return (
    <>
      <header className="overflow-hidden font-kyiv px-4 py-3.5 w-full text-4xl font-bold whitespace-nowrap bg-amber-500 text-stone-50 max-md:pr-5 max-md:max-w-full">
        <Link href={'/'}>Topdoc</Link>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults  /> {/*DocArray={DocArray}*/}
      </Suspense>
    </>
  );
}

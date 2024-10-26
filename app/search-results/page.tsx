import SearchResults from '@/components/serchdoctorResults/SearchResults';
// import Link from 'next/link';
import { Suspense } from 'react';

export default async function DoctorSearchPage() {
  // const response = await fetch('https://64.226.99.16:8090/api/v1/doctor/all');
  // const DocArray = await response.json();
  // console.log(DocArray,'DocArray')
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults /> {/*DocArray={DocArray}*/}
      </Suspense>
    </>
  );
}

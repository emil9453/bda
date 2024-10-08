import SearchResults from '@/components/serchdoctorResults/SearchResults';
import Link from 'next/link';
import { Suspense } from 'react';

export default function DoctorSearchPage() {
  return (
    <>
      <header className="overflow-hidden font-kyiv px-4 py-3.5 w-full text-4xl font-bold whitespace-nowrap bg-amber-500 text-stone-50 max-md:pr-5 max-md:max-w-full">
        <Link href={'/'}>Topdoc</Link>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
    </>
  );
}

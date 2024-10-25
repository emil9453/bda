'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';

export default function NavigationTabs() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('doctorsAndClinics');

  const handleTabClick = useCallback((tabName: string) => {
    setActiveTab(tabName);
  }, []);

  useEffect(() => {
  
    if (pathname.includes('reviews')) {
      setActiveTab('reviews');
    } else if (pathname.includes('dictionary_management')) {
      setActiveTab('dictionaryManagment');
    } else {
      setActiveTab('doctorsAndClinics');
    }
  }, [pathname]);

  return (
    <nav data-layername="add" className="flex flex-wrap gap-10 items-center self-start text-2xl">
      <button
        data-layername="doctorsAndClinics"
        className={`self-stretch my-auto ${
          activeTab === 'doctorsAndClinics'
            ? 'text-neutral-900 underline underline-offset-8'
            : 'text-neutral-400'
        }`}
        onClick={() => handleTabClick('doctorsAndClinics')}
      >
        <Link href={"/adminpage"}>Doctors and clinics</Link>
      </button>
      <button
        data-layername="reviews"
        className={`self-stretch my-auto ${
          activeTab === 'reviews'
            ? 'text-neutral-900 underline underline-offset-8'
            : 'text-neutral-400'
        }`}
        onClick={() => handleTabClick('reviews')}
      >
        <Link href={"/adminpage/reviews"}>Reviews</Link>
      </button>
      <button
        data-layername="dictionaryManagment"
        className={`self-stretch my-auto ${
          activeTab === 'dictionaryManagment'
            ? 'text-neutral-900 underline underline-offset-8'
            : 'text-neutral-400'
        }`}
        onClick={() => handleTabClick('dictionaryManagment')}
      >
        <Link href={"/adminpage/dictionary_management"}>Dictionary management</Link>
      </button>
    </nav>
  );
}

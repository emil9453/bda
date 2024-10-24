'use client'

import { useState, useCallback } from 'react'

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState('doctorsAndClinics')

  const handleTabClick = useCallback((tabName: string) => {
    setActiveTab(tabName)
  }, [])

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
        Doctors and clinics
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
        Reviews
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
        Dictionary management
      </button>
    </nav>
  )
}
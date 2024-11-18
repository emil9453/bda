'use client'

import * as React from 'react'
import { InputField } from './inputField'
import { TextArea } from './TextArea'
import UploadImage from './UploadImage'
import { PlusCircle, X } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { SERVER_URL } from '../constants'

interface Schedule {
  weekDay: string
  workingHoursFrom: string
  workingHoursTo: string
}

interface Clinic {
  clinicName: string
  location: string
  contactDetails: string
  city: string
  schedules: Schedule[]
}

interface ProfileData {
  fullName: string
  speciality: string
  serviceDescription: string
  clinics: Clinic[]
}

const daysOfWeek = ['Ba.E', 'Ç.A', 'Ç', 'C.A', 'Cüm.', 'Şən.', 'Baz.']
const dayMapping: { [key: string]: string } = {
  'Ba.E': 'Monday',
  'Ç.A': 'Tuesday',
  'Ç': 'Wednesday',
  'C.A': 'Thursday',
  'Cüm.': 'Friday',
  'Şən.': 'Saturday',
  'Baz.': 'Sunday'
}

interface EditProfileProps {
  doctorId: number
  onClose: () => void
}

export const EditProfile: React.FC<EditProfileProps> = ({ doctorId, onClose }) => {
  const [profileData, setProfileData] = React.useState<ProfileData>({
    fullName: "",
    speciality: "",
    serviceDescription: "",
    clinics: [],
  })
  const [photoFile, setPhotoFile] = React.useState<File | null>(null)

  React.useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/doctor/${doctorId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch doctor data')
        }
        const data = await response.json()
        setProfileData(data)
      } catch (error) {
        console.error('Error fetching doctor data:', error)
        toast.error('Failed to load doctor data')
      }
    }

    fetchDoctorData()
  }, [doctorId])

  const handleInputChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (file: File | null) => {
    setPhotoFile(file)
  }

  const addClinic = () => {
    setProfileData(prev => ({
      ...prev,
      clinics: [...prev.clinics, {
        clinicName: '',
        location: '',
        contactDetails: '',
        city: '',
        schedules: []
      }]
    }))
  }

  const removeClinic = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      clinics: prev.clinics.filter((_, i) => i !== index)
    }))
  }

  const updateClinic = (index: number, field: keyof Clinic, value: string) => {
    setProfileData(prev => ({
      ...prev,
      clinics: prev.clinics.map((clinic, i) =>
        i === index ? { ...clinic, [field]: value } : clinic
      )
    }))
  }

  const toggleWorkDay = (clinicIndex: number, day: string) => {
    setProfileData(prev => ({
      ...prev,
      clinics: prev.clinics.map((clinic, i) =>
        i === clinicIndex
          ? {
              ...clinic,
              schedules: clinic.schedules.some(s => s.weekDay === dayMapping[day])
                ? clinic.schedules.filter(s => s.weekDay !== dayMapping[day])
                : [...clinic.schedules, { weekDay: dayMapping[day], workingHoursFrom: '09:00', workingHoursTo: '17:00' }]
            }
          : clinic
      )
    }))
  }

  const updateWorkHours = (clinicIndex: number, day: string, field: 'workingHoursFrom' | 'workingHoursTo', value: string) => {
    setProfileData(prev => ({
      ...prev,
      clinics: prev.clinics.map((clinic, i) =>
        i === clinicIndex
          ? {
              ...clinic,
              schedules: clinic.schedules.map(schedule =>
                schedule.weekDay === dayMapping[day]
                  ? { ...schedule, [field]: value }
                  : schedule
              )
            }
          : clinic
      )
    }))
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('doctor', new Blob([JSON.stringify(profileData)], { type: 'application/json' }))
    
    if (photoFile) {
      formData.append('photo', photoFile)
    }
  
    try {
      const response = await fetch(`${SERVER_URL}/doctor/${doctorId}`, {
        method: 'PUT',
        body: formData,
      })
  
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Profile update failed: ${response.status} ${response.statusText} - ${errorText}`)
      }
  
      const result = await response.json()
      console.log('Profile updated:', result)
      toast.success("Həkim profili uğurla yeniləndi")
      onClose()
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error("Profil yeniləmə xətası")
    }
  }

  return (
    <main className="flex overflow-hidden flex-col px-5 py-5 text-base bg-white max-w-[824px] max-md:px-5 max-md:py-24">
      <h1 className="self-center text-2xl font-semibold text-black">Profili redaktə et</h1>

      <div className="flex justify-center my-2">
        <UploadImage onImageUpload={handleImageUpload} />
      </div>

      <InputField
        label="Ad, soyad*"
        value={profileData.fullName}
        onChange={value => handleInputChange('fullName', value)}
      />

      <InputField
        label="Ixtisas*"
        value={profileData.speciality}
        onChange={value => handleInputChange('speciality', value)}
      />

      <TextArea
        label="Haqqında*"
        value={profileData.serviceDescription}
        onChange={value => handleInputChange('serviceDescription', value)}
      />

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Klinikalar</h2>
        {profileData.clinics.map((clinic, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-grow flex-col mr-2">
                <InputField
                  label="Klinika adı*"
                  value={clinic.clinicName}
                  onChange={value => updateClinic(index, 'clinicName', value)}
                />
              </div>
              <button
                onClick={() => removeClinic(index)}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className='flex flex-col'>
                <InputField
                  label="Məkan*"
                  value={clinic.location}
                  onChange={value => updateClinic(index, 'location', value)}
                />
              </div>
              <div className='flex flex-col'>
                <InputField
                  label="Əlaqə məlumatları*"
                  value={clinic.contactDetails}
                  onChange={value => updateClinic(index, 'contactDetails', value)}
                />
              </div>
              <div className='flex flex-col mb-2'>
                <InputField
                  label="Şəhər*"
                  value={clinic.city}
                  onChange={value => updateClinic(index, 'city', value)}
                />
              </div>
            </div>
            <div className="mb-4 mt-2">
              <h3 className="text-sm font-medium mb-2">İş günləri və saatları</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {daysOfWeek.map(day => {
                  const schedule = clinic.schedules.find(s => s.weekDay === dayMapping[day])
                  return (
                    <div
                      key={day}
                      className={`p-2 rounded-md ${
                        schedule ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-700'
                      } transition-colors`}
                    >
                      <div
                        className="text-center font-medium cursor-pointer"
                        onClick={() => toggleWorkDay(index, day)}
                      >
                        {day}
                      </div>
                      {schedule && (
                        <div className="mt-2 text-xs">
                          <select
                            value={schedule.workingHoursFrom}
                            onChange={e => updateWorkHours(index, day, 'workingHoursFrom', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded-md"
                          >
                            {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                              <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {`${hour.toString().padStart(2, '0')}:00`}
                              </option>
                            ))}
                          </select>
                          <select
                            value={schedule.workingHoursTo}
                            onChange={e => updateWorkHours(index, day, 'workingHoursTo', e.target.value)}
                            className="w-full px-1 py-1 border border-gray-300 rounded-md mt-1"
                          >
                            {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                              <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {`${hour.toString().padStart(2, '0')}:00`}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addClinic}
          className="w-full py-2 px-4 bg-[rgba(252,151,54,1)] text-white rounded-md hover:bg-[rgba(252,151,54,0.8)] transition-colors flex items-center justify-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Yeni klinika əlavə et
        </button>
      </div>

      <button
        className="h-[52px] px-[121px] py-[17px] rounded-[6px] my-4 w-full mx-auto bg-[rgba(252,151,54,1)] hover:bg-[rgba(252,151,54,0.8)]"
        onClick={handleSubmit}
      >
        Yenilə
      </button>
      <Toaster position="top-center" />
    </main>
  )
}
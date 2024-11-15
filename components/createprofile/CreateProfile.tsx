'use client';

import * as React from 'react';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { SERVER_URL } from '../constants';
import { InputField } from './inputField';
import { TextArea } from './TextArea';
import UploadImage from './UploadImage';
import { PlusCircle, X } from 'lucide-react';

interface Clinic {
  name: string;
}

const daysOfWeek = ['Ba.E', 'Ç.A', 'Ç', 'C.A', 'Cüm.', 'Şən.', 'Baz.'];

export const CreateProfile: React.FC = () => {
  const [profileData, setProfileData] = React.useState({
    fullName: "Rəşad Həsənov",
    speciality: "Ixtisas",
    clinicName: [
      { "index": 0, "name": "Klinika 1" },
      { "index": 1, "name": "Klinika 2" }
    ],
    location: "",
    serviceDescription: ""
  }
  );
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [clinics, setClinics] = React.useState<Clinic[]>([]);
  const [workDays, setWorkDays] = React.useState<{ [key: string]: boolean }[]>([]);
  const [workHours, setWorkHours] = React.useState<{ from: string; to: string }[]>([]);

  const handleInputChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File | null) => {
    setPhotoFile(file);
  };

  const addClinic = () => {
    setClinics(prev => [...prev, { name: '' }]);
    setWorkDays(prev => [...prev, Object.fromEntries(daysOfWeek.map(day => [day, false]))]);
    setWorkHours(prev => [...prev, { from: '09:00', to: '17:00' }]);
  };

  const removeClinic = (index: number) => {
    setClinics(prev => prev.filter((_, i) => i !== index));
    setWorkDays(prev => prev.filter((_, i) => i !== index));
    setWorkHours(prev => prev.filter((_, i) => i !== index));
  };

  const updateClinic = (index: number, name: string) => {
    setClinics(prev => {
      const newClinics = prev.map((clinic, i) => 
        i === index ? { ...clinic, name } : clinic
      );
      // Update profileData.clinicName with the updated array of objects
      setProfileData(prevProfile => ({
        ...prevProfile,
        clinicName: newClinics.map((clinic, i) => ({ index: i, name: clinic.name }))
      }));
      return newClinics;
    });
    console.log(profileData)
  };
  

  const toggleWorkDay = (clinicIndex: number, day: string) => {
    setWorkDays(prev => prev.map((clinicDays, i) => 
      i === clinicIndex 
        ? { ...clinicDays, [day]: !clinicDays[day] }
        : clinicDays
    ));
  };

  const updateWorkHours = (clinicIndex: number, field: 'from' | 'to', value: string) => {
    setWorkHours(prev => prev.map((hours, i) => 
      i === clinicIndex ? { ...hours, [field]: value } : hours
    ));
  };

  const handleSubmit = async () => {
    const payload = {
      ...profileData,
      reviewCount: 0,
      ratingCount: 0,
      sortBy: '',
      photoUrl: 'string', // We'll update this after uploading the image
    };

    const formData = new FormData();
    formData.append('doctor', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      const response = await fetch(`${SERVER_URL}/doctor`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Profile creation failed');
      }

      const result = await response.json();
      console.log('Profile created:', result);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
    console.log(profileData, photoFile);
  };

  return (
    <main className="flex overflow-hidden flex-col px-5 py-5 text-base bg-white max-w-[824px] max-md:px-5 max-md:py-24">
      <h1 className="self-center text-2xl font-semibold text-black">Yeni profil yarat</h1>

      <div className="flex justify-center my-2">
        <UploadImage onImageUpload={handleImageUpload}  />
      </div>

      <InputField
        label="Ad, soyad*"
        value={profileData.fullName}
        onChange={value => handleInputChange('fullName', value)}
      />

      <div className="flex gap-2 mt-1 justify-between">
        <div className="flex flex-col flex-1">
          <InputField
            label="Ixtisas*"
            value={profileData.speciality}
            onChange={value => handleInputChange('speciality', value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          {/* Removed clinicName input as per your previous request */}
        </div>
      </div>
      <InputField
        label="Məkan*"
        value={profileData.location}
        onChange={value => handleInputChange('location', value)}
      />
      
      <TextArea
        label="Haqqında*"
        value={profileData.serviceDescription}
        onChange={value => handleInputChange('serviceDescription', value)}
      />

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Klinikalar</h2>
        {clinics.map((clinic, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
            <div className="flex items-center justify-between mb-4">
              <InputField
                label="Klinika adı*"
                value={clinic.name}
                onChange={value => updateClinic(index, value)}
              />
              <button
                onClick={() => removeClinic(index)}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">İş günləri və saatları</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {daysOfWeek.map(day => (
                  <div
                    key={day}
                    className={`p-2 rounded-md ${
                      workDays[index][day] ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-700'
                    } transition-colors`}
                  >
                    <div 
                      className="text-center font-medium cursor-pointer"
                      onClick={() => toggleWorkDay(index, day)}
                    >
                      {day}
                    </div>
                    {workDays[index][day] && (
                      <div className="mt-2 text-xs">
                        <select
                          value={workHours[index].from}
                          onChange={e => updateWorkHours(index, 'from', e.target.value)}
                          className="w-full px-1 py-1 border border-gray-300 rounded-md"
                        >
                          {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                            <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                              {`${hour.toString().padStart(2, '0')}:00`}
                            </option>
                          ))}
                        </select>
                        <select
                          value={workHours[index].to}
                          onChange={e => updateWorkHours(index, 'to', e.target.value)}
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
                ))}
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
        Yarat
      </button>
    </main>
  );
};
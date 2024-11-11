'use client';

import * as React from 'react';
import { InputField } from './inputField';
import { TextArea } from './TextArea';
import UploadImage from './UploadImage';
import { SERVER_URL } from '../constants';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css"

interface CustomInputProps {
  value?: string;
  onClick?: () => void; 
  className?: string; 
}

export const CreateProfile: React.FC = () => {
  const [profileData, setProfileData] = React.useState({
    fullName: 'Rəşad Həsənov',
    speciality: 'Ixtisas',
    clinicName: 'Klinika',
    location: '',
    serviceDescription: '',
  });
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File) => {
    setPhotoFile(file);
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

  const [startDate, setStartDate] = React.useState<Date | null>(new Date());

  const ExampleCustomInput = React.forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value || "Select Date"}
      </button>
    )
  );

  return (
    <main className="flex overflow-hidden flex-col px-5 py-5 text-base bg-white max-w-[824px] max-md:px-5 max-md:py-24">
      <h1 className="self-center text-2xl font-semibold text-black">Yeni profil yarat</h1>

      <div className="flex justify-center my-2">
        <UploadImage onImageUpload={handleImageUpload} />
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
          <InputField
            label="Klinika*"
            value={profileData.clinicName}
            onChange={value => handleInputChange('clinicName', value)}
          />
        </div>
      </div>
      <InputField
        label="Məkan*"
        value={profileData.location}
        onChange={value => handleInputChange('location', value)}
      />
       <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
      
      <TextArea
        label="Haqqında*"
        value={profileData.serviceDescription}
        onChange={value => handleInputChange('serviceDescription', value)}
      />

      <button
        className="h-[52px] px-[121px] py-[17px] rounded-[6px] my-4 w-full mx-auto bg-[rgba(252,151,54,1)] hover:bg-[rgba(252,151,54,0.8)]"
        onClick={handleSubmit}
      >
        Yarat
      </button>
    </main>
  );
};

'use client'

import * as React from 'react';
import { InputField } from './inputField';
import { TextArea } from './TextArea';
import UploadImage from './UploadImage';
import { SERVER_URL } from '../constants';

export const CreateProfile: React.FC = () => {
  const [formData, setFormData] = React.useState({
    fullName: 'Rəşad Həsənov',
    speciality: 'Ixtisas',
    clinicName: 'Klinika',
    location: '',
    serviceDescription: '',
  });
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File) => {
    setPhotoFile(file);
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      reviewCount: 0,
      ratingCount: 0,
      sortBy: "string",
      photoUrl: "string", // We'll update this after uploading the image
    };

    try {
      // First, upload the image if it exists
      if (photoFile) {
        const imageFormData = new FormData();
        imageFormData.append('photo', photoFile);

        const imageUploadResponse = await fetch(`${SERVER_URL}/doctor`, {
          method: 'POST',
          body: imageFormData,
        });

        if (!imageUploadResponse.ok) {
          throw new Error('Image upload failed');
        }

        const imageResult = await imageUploadResponse.json();
        payload.photoUrl = imageResult.url; // Assuming the server returns the URL of the uploaded image
      }

      // Now send the main payload
      const response = await fetch(`${SERVER_URL}/doctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Profile created:', result);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating profile:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <main className="flex overflow-hidden flex-col px-5 py-5 text-base bg-white max-w-[824px] max-md:px-5 max-md:py-24">
      <h1 className="self-center text-2xl font-semibold text-black">Yeni profil yarat</h1>

      <div className='flex justify-center my-2'>
        <UploadImage onImageUpload={handleImageUpload} />
      </div>

      <InputField 
        label="Ad, soyad*" 
        value={formData.fullName} 
        onChange={(value) => handleInputChange('fullName', value)} 
      />

      <div className="flex gap-2 mt-1 justify-between">
        <div className="flex flex-col">
          <InputField 
            label="Ixtisas*" 
            value={formData.speciality} 
            onChange={(value) => handleInputChange('speciality', value)} 
          />
        </div>
        <div className="flex flex-col">
          <InputField 
            label="Klinika*" 
            value={formData.clinicName} 
            onChange={(value) => handleInputChange('clinicName', value)} 
          />
        </div>
      </div>
      <InputField 
        label="Məkan*" 
        value={formData.location} 
        onChange={(value) => handleInputChange('location', value)} 
      />
      <TextArea 
        label="Haqqında*" 
        value={formData.serviceDescription} 
        onChange={(value) => handleInputChange('serviceDescription', value)} 
      />

      <button 
        className="h-[52px] px-[121px] py-[17px] border-none gap-0 rounded-[6px] my-4 w-full mx-auto bg-[rgba(252,151,54,1)]"
        onClick={handleSubmit}
      >
        Yarat
      </button>
    </main>
  );
};
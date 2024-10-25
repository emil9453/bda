import * as React from 'react';
import { InputField } from './inputField';
import { TextArea } from './TextArea';

export const CreateProfile: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-col px-5 py-5 text-base bg-white max-w-[824px] max-md:px-5 max-md:py-24">
      <h1 className="self-center text-2xl font-semibold text-black">
        Yeni profil yarat
      </h1>
      
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e1f5076-294d-4762-acb0-f27b1622717d?placeholderIfAbsent=true&apiKey=5ba75a88538f4558b4c858630355e7bb" 
        alt="Profile avatar"
        className="object-contain self-center  rounded-full aspect-square bg-zinc-300 h-[90px] w-[90px] max-md:mt-10" 
      />

      <InputField 
        label="Ad, soyad*"
        value="Rəşad Həsənov"
      />

      <div className='flex gap-2 mt-1'>
        <div><InputField label='Ixtisas*' value='Ixtisas'/></div>
       <div> <InputField label='Klinika*' value='Klinika'/></div>

      </div>
      <InputField label='Məkan*' value=''/>
      <TextArea label='Haqqında*' value='' />
        

        <button className=' h-[52px] px-[121px] py-[17px] border-none gap-0 rounded-[6px] my-4 w-full mx-auto bg-[rgba(252,151,54,1)]'>
            Yarat
        </button>
     
    </main>
  );
};
import * as React from 'react';
import { InputField } from './inputField';
import { TextArea } from './TextArea';
import UploadImage from './UploadImage';

export const CreateProfile: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-col px-5 py-5 text-base bg-white max-w-[824px] max-md:px-5 max-md:py-24">
      <h1 className="self-center text-2xl font-semibold text-black">Yeni profil yarat</h1>

    
       <div className='flex justify-center my-2'>
       <UploadImage/>
       </div>

      <InputField label="Ad, soyad*" value="Rəşad Həsənov" />

      <div className="flex gap-2 mt-1 justify-between">
        <div className="flex flex-col">
          <InputField label="Ixtisas*" value="Ixtisas" />
        </div>
        <div className="flex flex-col">
          {' '}
          <InputField label="Klinika*" value="Klinika" />
        </div>
      </div>
      <InputField label="Məkan*" value="" />
      <TextArea label="Haqqında*" value="" />

      <button className=" h-[52px] px-[121px] py-[17px] border-none gap-0 rounded-[6px] my-4 w-full mx-auto bg-[rgba(252,151,54,1)]">
        Yarat
      </button>
    </main>
  );
};

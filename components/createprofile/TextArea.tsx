import * as React from 'react';
import { TextAreaProps } from './types';

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '' }) => {
  return (
    <div className="flex flex-col self-center mt-4 w-full max-w-[643px] max-md:max-w-full">
      <label className="font-bold text-zinc-400 max-md:max-w-full">
        {label}
      </label>
      <div className={`overflow-hidden px-5 pt-4 pb-8 mt-4 w-full leading-6 rounded-md border border-orange-400 border-solid text-neutral-800 max-md:max-w-full ${className}`}>
        <textarea className='resize-none w-full focus:outline-none'/>
      </div>
    </div>
  );
};
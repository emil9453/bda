import * as React from 'react';
import { InputFieldProps } from './types';

export const InputField: React.FC<InputFieldProps> = ({ label,  className = '' }) => {
  return (
    <>
      <label className="self-start mt-3 ml-3  top-0 left-0 font-bold text-zinc-400 max-md:ml-2.5">
        {label}
      </label>
      <input className={`overflow-hidden py-1 mt-1 ml-0 focus:outline-none relative max-w-full font-semibold border-b border-solid border-b-yellow-500 text-neutral-800 w-[200px] max-md:pr-5 max-md:ml-2.5 ${className}`}>
       
      </input>
    </>
  );
};
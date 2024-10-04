import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
}

const InputField: React.FC<InputFieldProps> = ({ label }) => {
  return (
    <div className="flex flex-col text-base mb-5 font-bold text-zinc-400 max-md:mt-10">
      <label htmlFor={label.toLowerCase().replace(' ', '-')}>{label}*</label>
      <input
        type="text"
        id={label.toLowerCase().replace(' ', '-')}
        className="overflow-hidden py-4 mt-1 font-semibold whitespace-nowrap border-b border-solid border-b-yellow-500 text-neutral-800 focus:outline-none" // Kenarlık kaldırıldı
      />
    </div>
  );
};

export default InputField;

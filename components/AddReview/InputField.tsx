import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>; 
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({ label, id }) => {
  return (
    <>
      <label htmlFor={id} className="text-base font-bold text-zinc-400">
        {label}
      </label>
      <input
        id={id}
        className="flex shrink-0 self-stretch mt-1 border-b border-solid border-b-yellow-500 h-[52px]"
        type="text"
        aria-label={label}
      />
    </>
  );
};

export default InputField;
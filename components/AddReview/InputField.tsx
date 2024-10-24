import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>; 
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  disabled: boolean,
}

const InputField: React.FC<InputFieldProps> = ({ label, id, value, name, onChange, onBlur }) => {
  return (
    <>
      <label htmlFor={id} className="text-xs mt-2 font-bold text-zinc-400">
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="flex shrink-0 focus:outline-none w-40 self-stretch mt-1 border-b border-solid border-b-yellow-500 h-[32px]"
        type="text"
        aria-label={label}
        
      />
    </>
  );
};

export default InputField;
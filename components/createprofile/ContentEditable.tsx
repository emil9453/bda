import React, { useRef } from 'react';

interface ContentEditableFieldProps {
  label: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

export const ContentEditableField: React.FC<ContentEditableFieldProps> = ({
  label,
  value,
  className = '',
  onChange,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (contentRef.current) {
      onChange(contentRef.current.innerText);
    }
  };

  return (
    <>
      <label className="self-start mt-3 ml-3 top-0 left-0 font-bold text-zinc-400 max-md:ml-2.5">
        {label}
      </label>
      <div
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleInput}
        className={`overflow-hidden py-1 mt-1 ml-0 focus:outline-none relative max-w-full font-semibold border-b border-solid border-b-yellow-500 text-neutral-800 w-[200px] h-[100px] max-md:pr-5 max-md:ml-2.5 ${className}`}
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {value}
      </div>
    </>
  );
};
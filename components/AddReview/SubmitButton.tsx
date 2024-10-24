import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="overflow-hidden self-center px-11 py-3 mt-4 max-w-full text-base font-semibold whitespace-nowrap bg-orange-400 rounded-md text-stone-50 w-[300px] max-md:px-5 max-md:mt-10"
    >
      Təsdiqlə
    </button>
  );
};

export default SubmitButton;
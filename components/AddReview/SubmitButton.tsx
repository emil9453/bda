import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="overflow-hidden self-center px-16 py-5 mt-7 max-w-full text-2xl font-semibold whitespace-nowrap bg-orange-400 rounded-md text-stone-50 w-[300px] max-md:px-5 max-md:mt-10"
    >
      Təsdiqlə
    </button>
  );
};

export default SubmitButton;
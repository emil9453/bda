import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="overflow-hidden self-center px-16 py-5 mt-28 max-w-full text-2xl font-semibold text-black whitespace-nowrap bg-orange-400 rounded-md w-[300px] max-md:px-5 max-md:mt-10"
    >
      Submit
    </button>
  );
};

export default SubmitButton;

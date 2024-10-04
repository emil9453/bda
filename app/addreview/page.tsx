import React from 'react';
import InputField from "@/components/ui/InputField";
import RatingStars from '@/components/ui/RatingStars';
import SubmitButton from '@/components/ui/SubmitButton';

export default function ReviewForm() {
  
  return (
    <form  className="flex overflow-hidden flex-col px-20 py-20 bg-white rounded-lg border border-black border-solid max-w-[1338px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
      <h1 className="self-center text-2xl font-semibold text-black">
        Add a new review
      </h1>
      <div className="mt-16 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <InputField label="Name" value="Narmina" />
            <InputField label="Surname" value="Hussain" />
            <InputField label="Doctor name" value="Rashad" />
            <InputField label="Doctor surname" value="Hasanov" />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <InputField label="Clinic" value="Medical Plaza" />
            <InputField label="Specialty" value="Pediatrician" />
            <RatingStars />
          </div>
        </div>
      </div>
      <label htmlFor="review" className="self-start mt-12 text-base font-bold text-zinc-600 text-opacity-70 max-md:mt-10 max-md:ml-2">
        *
      </label>
      <textarea
        id="review"
        className="overflow-hidden resize-none focus:outline-none px-16 pt-12 pb-24 mt-2 text-base font-bold rounded-md border border-orange-400 border-solid text-zinc-600 text-opacity-70 max-md:px-5 max-md:pb-28 max-md:max-w-full"
        placeholder="Write a review"
      ></textarea>
      <div className="flex gap-1.5 self-start mt-3.5 text-base text-neutral-800 max-md:ml-1.5">
        <input type="checkbox" name="checkbox" id="checkbox" required />
        <p className="flex-auto my-auto">
          &quot;By using &quot;TopDoc&quot;, you agree to our Terms of Use.&quot;
        </p>
      </div>
      <SubmitButton />
    </form>
  );
};
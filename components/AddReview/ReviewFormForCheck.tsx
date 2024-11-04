'use client';

import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import CheckOrReject from './CheckOrReject';
import InputField from './InputField';
import RatingStars from './RatingStars';

interface ReviewFormProps {
  onSubmit?: (formData: any) => void;
  doctorName?: string;
  clinic?: string;
  specialty?: string;
  reviewId: number;
  setIsReviewFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fullname: string;
  reviewtext: string;
  rating: number;
}

const ReviewFormForCheck: React.FC<ReviewFormProps> = ({
  onSubmit,
  doctorName = '',
  clinic = '',
  specialty = '',
  reviewId,
  setIsReviewFormOpen,
  fullname = '',
  reviewtext = '',
  rating = 0,
}) => {
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .test(
        'fullName',
        'Ad və soyad tələb olunur (ən azı iki söz olmalıdır)',
        value => !!value && value.trim().split(/\s+/).filter(Boolean).length >= 2,
      )
      .required('Ad və soyad tələb olunur'),
    doctorName: Yup.string()
      .test(
        'doctorName',
        'Həkimin adı, soyadı tələb olunur (ən azı iki söz olmalıdır)',
        value => !!value && value.trim().split(/\s+/).filter(Boolean).length >= 2,
      )
      .required('Həkimin adı, soyadı tələb olunur'),
    clinic: Yup.string().required('Klinika tələb olunur'),
    specialty: Yup.string().required('İxtisas tələb olunur'),
    rating: Yup.number().min(1, 'Reytinq tələb olunur').required('Reytinq tələb olunur'),
    reviewText: Yup.string().required('Rəy yazılması tələb olunur'),
    acceptTerms: Yup.boolean().oneOf([true], 'Şərtləri qəbul etməlisiniz'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: fullname,
      doctorName: doctorName,
      clinic: clinic,
      specialty: specialty,
      rating: rating,
      reviewText: reviewtext,
    },
    validationSchema,
    onSubmit: async values => {
      onSubmit?.(values);
    },
  });

  useEffect(() => {
    formik.setValues({
      fullName: fullname,
      doctorName: doctorName,
      clinic: clinic,
      specialty: specialty,
      rating: rating,
      reviewText: reviewtext,
    });
  }, [fullname, doctorName, clinic, specialty, rating, reviewtext]);

  return (
    <form
      className="flex overflow-hidden flex-col px-8 py-2 bg-white rounded-lg h-full max-w-[824px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5  w-full"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="self-center text-base font-semibold text-black">Rəyi redaktə et</h1>
      <div className="mt-3 max-md:mt-7 max-md:mr-1 max-md:max-w-full">
        <div className="flex gap-3 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start max-md:mt-10">
              <InputField
                label="Ad, soyad*"
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={false}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-500 text-xs">{formik.errors.fullName}</div>
              )}

              <InputField
                label="Həkimin adı, soyadı*"
                id="doctorName"
                name="doctorName"
                value={formik.values.doctorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
              />
              {formik.touched.doctorName && formik.errors.doctorName && (
                <div className="text-red-500 text-xs">{formik.errors.doctorName}</div>
              )}

              <div className="w-full">
                <RatingStars
                  rating={formik.values.rating}
                  onRatingChange={newRating => {
                    formik.setFieldValue('rating', newRating);
                    formik.setFieldTouched('rating', true, false);
                  }}
                />
                {formik.touched.rating && formik.errors.rating && (
                  <div className="text-red-500 text-sm">{formik.errors.rating}</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <InputField
              label="Klinika*"
              id="clinic"
              name="clinic"
              value={formik.values.clinic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={true}
            />
            {formik.touched.clinic && formik.errors.clinic && (
              <div className="text-red-500 text-xs">{formik.errors.clinic}</div>
            )}

            <InputField
              label="İxtisas*"
              id="specialty"
              name="specialty"
              value={formik.values.specialty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={true}
            />
            {formik.touched.specialty && formik.errors.specialty && (
              <div className="text-red-500 text-xs">{formik.errors.specialty}</div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-2">
        <textarea
          className={`overflow-hidden resize-none px-3 py-3 h-24 mt-2 text-base font-bold rounded-md border ${
            formik.touched.reviewText && formik.errors.reviewText
              ? 'border-red-500'
              : 'border-orange-400'
          } border-solid text-zinc-600 text-opacity-70 max-md:px-5 max-md:pb-28 max-md:max-w-full w-full`}
          placeholder="Rəy yaz"
          aria-label="Write your review"
          value={formik.values.reviewText}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="reviewText"
          name="reviewText"
        />
        {formik.touched.reviewText && formik.errors.reviewText && (
          <div className="text-red-500 text-xs">{formik.errors.reviewText}</div>
        )}
      </div>

      <div className="flex items-start gap-1 self-start mt-3.5 text-base text-neutral-800"></div>

      <CheckOrReject reviewId={reviewId} setIsReviewFormOpen={setIsReviewFormOpen} />
    </form>
  );
};

export default ReviewFormForCheck;

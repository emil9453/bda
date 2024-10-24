'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from './InputField'
import RatingStars from './RatingStars'
import SubmitButton from './SubmitButton'
import axios from 'axios'



interface ReviewFormProps {
  onSubmit: (formData: any) => void
  doctorName?: string
  clinic?: string
  specialty?: string
  isPreFilled?: boolean
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  onSubmit, 
  doctorName = '', 
  clinic = '', 
  specialty = '', 
  isPreFilled = false 
}) => {
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .test(
        'fullName',
        'Ad və soyad tələb olunur (ən azı iki söz olmalıdır)',
        (value) => !!value && value.trim().split(/\s+/).filter(Boolean).length >= 2
      )
      .required('Ad və soyad tələb olunur'),
    doctorName: Yup.string()
      .test(
        'doctorName',
        'Həkimin adı, soyadı tələb olunur (ən azı iki söz olmalıdır)',
        (value) => !!value && value.trim().split(/\s+/).filter(Boolean).length >= 2
      )
      .required('Həkimin adı, soyadı tələb olunur'),
    clinic: Yup.string().required('Klinika tələb olunur'),
    specialty: Yup.string().required('İxtisas tələb olunur'),
    rating: Yup.number().min(1, 'Reytinq tələb olunur').required('Reytinq tələb olunur'),
    reviewText: Yup.string().required('Rəy yazılması tələb olunur'),
    acceptTerms: Yup.boolean().oneOf([true], 'Şərtləri qəbul etməlisiniz'),
  })

  const formik = useFormik({
    initialValues: {
      fullName: '',
      doctorName: doctorName,
      clinic: clinic,
      specialty: specialty,
      rating: 0,
      reviewText: '',
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values.doctorName, values.specialty)
    
      //   const response = await axios.get(`http://64.226.99.16:8090/api/v1/doctor/all`, {
      //     params: {
      //       fullName: values.doctorName,
      //       speciality: values.specialty,
      //     }
      //   })

      //   console.log(response.data)
        

      try {
        const response = await axios.get(`http://64.226.99.16:8090/api/v1/doctor/all`, {
          params: {
            fullName: values.doctorName,
            speciality: values.specialty,
          }
        })
        if (response.data.length > 0) {
          const doctorId = response.data[0].doctorId
          console.log(`D👻😐😐 Doctor id: ${doctorId}`)
          await axios.post(`http://64.226.99.16:8090/api/v1/review/reviews?fullName=${values.doctorName}&clinicName=${values.clinic}%20Clinic&speciality=${values.specialty}`, {
            fullName: values.fullName,
            comment: values.reviewText, 
            rating: values.rating 
          })
          alert("Review uğurla gönderildi!")
        }
        
        // else {
        //   await axios.post(`/api/admin/notifications`, {
        //     message: `Yeni hekim profili yaratmaq lazimdir: ${values.doctorName}, İxtisas: ${values.specialty}`
        //   })
        //   alert("hekim tapilmadi, admine bildiris gonderildi.")
        // }
      } catch (error) {
        console.error("Xeta Bas verdi:", error)
        alert("Xeta Bas verdi.")
      }
      onSubmit(values)
        
      
      onSubmit(values)
    },
  })

  return (
    <form
      className="flex overflow-hidden flex-col px-20 py-20 bg-white rounded-lg border border-black border-solid max-w-[824px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="self-center text-2xl font-semibold text-black">Yeni rəy əlavə et</h1>
      <div className="mt-16 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
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
                <div className='text-red-500 text-sm'>{formik.errors.fullName}</div>
              )}
              
              <InputField
                label="Həkimin adı, soyadı*"
                id="doctorName"
                name='doctorName'
                value={formik.values.doctorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isPreFilled}
              />
              {formik.touched.doctorName && formik.errors.doctorName && (
                <div className='text-red-500 text-sm'>{formik.errors.doctorName}</div>
              )}
              
              <div className="w-full">
                <RatingStars
                  rating={formik.values.rating}
                  onRatingChange={(newRating) => {
                    formik.setFieldValue('rating', newRating)
                    formik.setFieldTouched('rating', true, false)
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
              name='clinic'
              value={formik.values.clinic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPreFilled}
            />
            {formik.touched.clinic && formik.errors.clinic && (
              <div className='text-red-500 text-sm'>{formik.errors.clinic}</div>
            )}
            
            <InputField
              label="İxtisas*"
              id="specialty"
              name='specialty'
              value={formik.values.specialty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPreFilled}
            />
            {formik.touched.specialty && formik.errors.specialty && (
              <div className='text-red-500 text-sm'>{formik.errors.specialty}</div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-2">
        <textarea
          className={`overflow-hidden resize-none px-16 pt-12 pb-24 mt-2 text-base font-bold rounded-md border ${
            formik.touched.reviewText && formik.errors.reviewText ? 'border-red-500' : 'border-orange-400'
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
          <div className="text-red-500 text-sm">{formik.errors.reviewText}</div>
        )}
      </div>

      <div className="flex flex-wrap gap-1 self-start mt-3.5 text-base text-neutral-800">
        <input
          type="checkbox"
          name="acceptTerms"
          id="acceptTerms"
          checked={formik.values.acceptTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="object-contain shrink-0 aspect-square w-[22px]"
        />
        <p className="flex-auto my-auto max-md:max-w-full">
          TopDoc istifadə edərəkən istifadə şərtlərimizlə razılaşırsınız.
        </p>
      </div>
      {formik.touched.acceptTerms && formik.errors.acceptTerms && (
        <div className="text-red-500 text-sm">{formik.errors.acceptTerms}</div>
      )}
      <SubmitButton />
    </form>
  )
}

export default ReviewForm
import React from 'react';
import InputField from './InputField';
import RatingStars from './RatingStars';
import SubmitButton from './SubmitButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


interface ReviewFormProps {
  onSubmit: (formData: any) => void;
}
// morteze icine { onSubmit } yaz islemese
const ReviewFormTwo: React.FC<ReviewFormProps> = () => {
    /////Validation //////
    const validationSchema = Yup.object({
      fullName: Yup.string()
      .test(
        'fullName',
        'Ad və soyad tələb olunur',
        (value) => !!value && value?.trim().split(' ').length >= 2 
      )
      .required('Ad və soyad tələb olunur'),
  doctorName: Yup.string()
      .test('doctorName', 'Həkimin adı, soyadı tələb olunur', (value) => !!value && value.trim().split(' ').length >= 2)
      .required('Həkimin adı, soyadı tələb olunur'),
        clinic: Yup.string().required('Klinika tələb olunur'),
        specialty: Yup.string().required('İxtisas tələb olunur'),
        rating: Yup.number().min(1, 'Reytinq tələb olunur').required('Reytinq tələb olunur'),
        reviewText: Yup.string().required('Rəy yazılması tələb olunur'),
        acceptTerms: Yup.boolean().oneOf([true], 'Şərtləri qəbul etməlisiniz')
      });

      /////Formik hook/////

      const formik = useFormik({
        initialValues: {
          fullName: '',
          doctorName: '',
          clinic: '',
          specialty: '',
          rating: 0,
          reviewText: '',
          acceptTerms: false,
        },
        validationSchema,
        onSubmit: async (values) => {
         try {
            const response = await axios.get(`http://64.226.99.16:8090/api/v1/doctor/all`,{
                params:{
                    fullName: values.doctorName,
                    speciality: values.specialty,
                }
            });
            if(response.data.length >0){
                const doctorId = response.data[0].id;
                await axios.post(`http://64.226.99.16:8090/api/v1/doctor/${doctorId}/reviews`, {
                    fullName: values.fullName,
                    reviewText: values.reviewText, 
                    rating: values.rating 
          });
          alert("Review başarıyla gönderildi!");
            } else{
                await axios.post(`/api/admin/notifications`, {
                    message: `Yeni hekim profili yaratmaq lazimdir: ${values.doctorName}, İxtisas: ${values.specialty}`
                  });
                  alert("hekim tapilmadi, admine bildiris gonderildi.");
                }
            }
            
          catch (error) {
            console.error("Xeta Bas verdi:", error);
        alert("Xeta Bas verdi.");
         }
         
        },
      });

  return (
    <form className="flex overflow-hidden flex-col px-20 py-20 bg-white rounded-lg border border-black border-solid max-w-[824px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5" onSubmit={formik.handleSubmit}>
      <h1 className="self-center text-2xl font-semibold text-black">
        Yeni rəy əlavə et
      </h1>
      <div className="mt-16 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start max-md:mt-10">
              <InputField label="Ad, soyad*"
               id="fullName"
               value={formik.values.fullName}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
              ) : null}
              <InputField 
              label="Həkimin adı, soyadı*"
               id="doctorName"
               value={formik.values.doctorName}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
                />
                {formik.touched.doctorName && formik.errors.doctorName ? (
                    <div className='text-red-500 text-sm'>{formik.errors.doctorName}</div>
                ): null}
              <RatingStars
              rating={formik.values.rating}
              onRatingChange={(newRating) => formik.setFieldValue('rating', newRating)}  />
              {formik.touched.rating && formik.errors.rating ? (
              <div className='text-red-500 text-sm'>{formik.errors.rating}</div>
              ): null}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <InputField label="Klinika*"
             id="clinic"
             value={formik.values.clinic}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
              />
              {formik.touched.clinic && formik.errors.clinic ? (
                <div className='text-red-500 text-sm'>{formik.errors.clinic}</div>
              ): null}
            <InputField
             label="İxtisas*"
              id="specialty"
              value={formik.values.specialty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
               />
               {formik.touched.specialty && formik.errors.specialty ? (
                <div className='text-red-500 text-sm'>{formik.errors.specialty}</div>
               ): null}
          </div>
        </div>
      </div>
      <div className="self-start mt-8 ml-3 text-base font-bold text-zinc-600 text-opacity-70 max-md:ml-2.5">
        *
      </div>
      <textarea 
        className="overflow-hidden resize-none px-16 pt-12 pb-24 mt-2 text-base font-bold rounded-md border border-orange-400 border-solid text-zinc-600 text-opacity-70 max-md:px-5 max-md:pb-28 max-md:max-w-full"
        placeholder="Rəy yaz"
        aria-label="Write your review"
        value={formik.values.reviewText}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        id='reviewText'
      />{
        formik.touched.reviewText && formik.errors.reviewText ? (
            <div className='text-red-500 text-sm'>{formik.errors.reviewText}</div>
        ) :null
      }
      <div className="flex flex-wrap gap-1 self-start mt-3.5 text-base text-neutral-800">
         <input type="checkbox" name="" id="" required  className='className="object-contain shrink-0 aspect-square w-[22px]"'/>
        <p className="flex-auto my-auto max-md:max-w-full">
          TopDoc istifadə edərəkən istifadə şərtlərimizlə razılaşırsınız.
        </p>
      </div>
      <SubmitButton />
    </form>
  );
};

export default ReviewFormTwo;
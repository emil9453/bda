import { useFormik } from 'formik';
import * as Yup from 'yup';

// Define the shape of your form values
interface FormValues {
  fullName: string;
  doctorName: string;
  clinic: string;
  specialty: string;
  rating: number;
  reviewText: string;
  acceptTerms: boolean;
}

// Define the props for your custom hook
interface UseReviewFormProps {
  onSubmit: (values: FormValues) => void;
}

export const useReviewForm = ({ onSubmit }: UseReviewFormProps) => {
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
  });

  const formik = useFormik<FormValues>({
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
      onSubmit(values);
    },
  });

  return formik;
};
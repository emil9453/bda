import { SERVER_URL } from '@/components/constants';
import axios from 'axios';

export const getDoctorSpecs = async ({
  fullName,
  speciality,
  clinicName,
  location,
  reviewCount,
  ratingCount,
  sortBy,
}: {
  fullName?: string;
  speciality?: string;
  clinicName?: string;
  location?: string;
  reviewCount?: string | null;
  ratingCount?: string | null;
  sortBy?: string;
}) => {
  const result = await axios.post(`${SERVER_URL}/doctor/specification`, {
    fullName,
    speciality,
    clinicName,
    location,
    reviewCount,
    ratingCount,
    sortBy,
  });
  return result.data;
};

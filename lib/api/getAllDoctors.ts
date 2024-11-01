import { SERVER_URL } from '@/components/constants';

export const getAllDoctors = () => fetch(`${SERVER_URL}/doctor/all`).then(res => res.json());

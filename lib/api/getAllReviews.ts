import { SERVER_URL } from '@/components/constants';

export const getAllReviews = () => fetch(`${SERVER_URL}/review/all`).then(res => res.json());

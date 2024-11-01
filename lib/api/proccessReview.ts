import { SERVER_URL } from '@/components/constants';

export const proccessReview = async ({ reviewId, status }) => {
  const response = await fetch(`${SERVER_URL}/review/${reviewId}/status?newStatus=${status}`, {
    method: 'PUT',
    headers: {
      accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update doctor status');
  }
  window.location.reload();
  return response.json();
};

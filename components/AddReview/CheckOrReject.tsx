import { CheckCircle, XCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { proccessReview } from '@/lib/api';
import { Dispatch, SetStateAction, useEffect } from 'react';
interface CheckOrRejectProps {
  reviewId: number;
  setIsReviewFormOpen: Dispatch<SetStateAction<boolean>>;
}

const CheckOrReject: React.FC<CheckOrRejectProps> = ({ reviewId, setIsReviewFormOpen }) => {
  const { mutate, status, error } = useMutation({
    mutationFn: ({ reviewId, status }: { reviewId: number; status: 'APPROVED' | 'REJECTED' }) =>
      proccessReview({ reviewId, status }),
  });

  const handleProccess = async (status: 'APPROVED' | 'REJECTED') => {
    mutate({
      reviewId,
      status,
    });
  };

  useEffect(() => {
    if (status === 'success') {
      setIsReviewFormOpen(false);
    }
  }, [setIsReviewFormOpen, status]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <div className="flex justify-center gap-5">
      <button onClick={() => handleProccess('APPROVED')}>
        {' '}
        <CheckCircle color="green" size={24} />
      </button>
      <button onClick={() => handleProccess('REJECTED')}>
        {' '}
        <XCircle color="red" size={24} />
      </button>
    </div>
  );
};

export default CheckOrReject;

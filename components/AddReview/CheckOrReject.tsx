import { CheckCircle, XCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { proccessReview } from '@/lib/api';
interface IconExampleProps {
  reviewId: number;
}

const IconExample: React.FC<IconExampleProps> = ({ reviewId }) => {
  const mutation = useMutation({
    mutationFn: ({ reviewId, status }: { reviewId: number; status: 'APPROVED' | 'REJECTED' }) =>
      proccessReview({ reviewId, status }),
  });

  const handleProccess = async (status: 'APPROVED' | 'REJECTED') => {
    mutation.mutate({
      reviewId,
      status,
    });
  };

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

export default IconExample;

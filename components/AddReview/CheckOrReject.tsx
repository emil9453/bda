import { CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { SERVER_URL } from '../constants';
interface IconExampleProps {
  
  reviewId: number
}

const IconExample:React.FC<IconExampleProps> = ({reviewId}) => {
  const handleStatusUpdate = async (reviewId, status) => {
    try {
      await axios.put(
        `${SERVER_URL}/review/${reviewId}/status`,
        { status }
      );
      console.log(`Review status updated to: ${status}`);
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };
  return (
    <div className='flex justify-center gap-5'>
     <button onClick={() => handleStatusUpdate(reviewId, "APPROVED")} > <CheckCircle color="green" size={24} /></button>  
     <button onClick={() => handleStatusUpdate(reviewId, "REJECTED")}> <XCircle color="red" size={24} /></button>         
    </div>
  );
};

export default IconExample;
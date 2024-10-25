import { CheckCircle, XCircle } from 'lucide-react';

const IconExample = () => {
  return (
    <div className='flex justify-center gap-5'>
     <button> <CheckCircle color="green" size={24} /></button>  
     <button> <XCircle color="red" size={24} /></button>         
    </div>
  );
};

export default IconExample;
import { useState } from "react"
import { SERVER_URL } from "../constants";
import toast from 'react-hot-toast';
import axios from "axios";

export default function AddSpeciality(){
const [item,setItem] = useState("");

const handleSubmit = ()=>{
       axios.post(`${SERVER_URL}/doctor/create-speciality`, {
              specialityName: item,
            }).then(response => {
              console.log('Speciality created successfully:', response.data);
              toast.success("uğurla yaradıldı")
            })
}

return(
    <div className="flex flex-col gap-5 items-center mt-7">
       <div className="flex items-center gap-4">
              <span className="font-poppins">Name</span>
              <input onChange={(e)=>setItem(e.target.value)} className="border px-2 rounded-sm w-[460px] h-[45px] border-[rgba(255,145,2,1)]" type="text" name="" id="" />
        </div>
       
        <div className="w-[390px]">
        <button onClick={handleSubmit} className="w-[447px] h-[45px] rounded-sm px-1 text-white bg-[rgba(255,145,2,1)]" type="submit">Add Item</button>
        </div>
       </div>
)
}